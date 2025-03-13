import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, setDoc, doc, getDoc, query, where, onSnapshot, updateDoc, getDocs} from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import router from '@/router'

import { useDbStore } from '@/store/dbStore'
import { useMetaStore  } from '@/store/useMetaStore'
import { useRevStore } from "@/store/revStore";
import { useNotificacaoStore } from '@/store/useNotificacaoStore'
const notifcacaoStore = useNotificacaoStore()


export const useRegisterStore = defineStore('registerStore', {
  state: () => ({
    user: null,
    load: false,
    loadAll: false,
    userData: null, 
    msgError: null,
    userDados: {}
  }),
  getters:{
    readUser(){
        return this.user
    },
    readMsgError(){
        return this.msgError
    },
    readUserDados(){
        return this.userDados
    },
    readAllLoad(){
        return this.loadAll
    }
  },
  actions:{
    async registerUser(userLogin){
        this.load = true
        this.msgError = null
        try {
            const { user } = await createUserWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            this.user = {email: user.email, uid: user.uid}
            this.saveUserData()
            this.addUsers()
            notifcacaoStore.getNotificacoes(user.uid)
            router.push('/home')
        } catch (error) {
            console.log(error);
        } finally{
            this.load = false
        }
    },
    async loginUser(userLogin){
        this.load = true
        this.loadAll = true
        const revStore = useRevStore()
        this.msgError = null

        try {
            const { user } = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            this.user = {email: user.email, uid: user.uid}
            this.saveUserData()
            await this.getUserData()
            await this.getUser()
            await notifcacaoStore.getNotificacoes(user.uid)
            await revStore.getAllConteudo()
            
            if(this.readUserDados?.type == 1){
                router.push('/mentor')
                return
            }
            await this.initializer()
            router.push('/home') 
    
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                //   console.error("Erro: Conta não existe.");
                  this.msgError = "Conta não existe."
                  break;
                case 'auth/wrong-password':
                //   console.error("Erro: Senha incorreta.");
                  this.msgError = "E-mail e/ou senha incorreto(s)."
                  break;
                case 'auth/invalid-email':
                //   console.error("Erro: E-mail inválido.");
                  this.msgError = "E-mail e/ou senha incorreto(s)."
                  break;                default:
                //   console.error("Erro desconhecido:", error.message);
                  this.msgError = "E-mail e/ou senha incorreto(s)."
                  break;
              }
        } finally {
            this.load = false
        }
    },
    async getUserData(){
        const revStore = useRevStore()
        revStore.getMarkRevUser()
        revStore.getFavUser()
    },
    async logoutUser(){
        this.load = true
        const dbStore = useDbStore()
        const metaStore = useMetaStore()
        const notifcacaoStore = useNotificacaoStore()
        const revStore = useRevStore()
        try {
            await signOut(auth)
            this.user = null
            this.userData = null
            this.userDados = {}

            metaStore.metas = []
            metaStore.meta = []
            metaStore.tarefas = []
            metaStore.allTarefas = []

            dbStore.disciplinas = []
            dbStore.concursos = []
            dbStore.conteudo = []
            dbStore.disciplinaSelect = null

            notifcacaoStore.notificacoes = []
            notifcacaoStore.usuario = {}

            revStore.listAllRevs = []
            revStore.listRevs = []
    
            localStorage.removeItem('userDataRev');
            router.push('/')
        } catch (error) {
            console.log(error);
        } finally {
            this.load = false
        }
    },
    currentUser(){
        return new Promise((resolve, reject) => {
            const unsuscribe = onAuthStateChanged(auth, user => {
                if(user){
                    this.user = { email: user.email, uid: user.uid}
                } else {
                    this.user = null
                }
                resolve(user)
            }, e => reject(e))
            unsuscribe()
        })
    },
    saveUserData() {
      localStorage.setItem('userDataRev', JSON.stringify(this.user));
    },
    async loadUserData() {
      if(this.readUser?.uid) return
      this.loadAll = true
      const data = localStorage.getItem('userDataRev');
      const revStore = useRevStore()
      console.log('loadUserData');
      if (data) {
          const login = {
              email: JSON.parse(data).email,
              uid: JSON.parse(data).uid
          }
          if(login.email) {
            this.user = {email: login.email, uid: login.uid}
            await this.getUser()
            notifcacaoStore.getNotificacoes(login.uid)
            await revStore.getAllConteudo()

            if(this.readUserDados?.type != 1){
                this.initializer()
            }
        }
      }
    },
    async initializer(){
        this.loadAll = true
        try {
            const dbStore = useDbStore()
            const metaStore = useMetaStore()
    
            // await dbStore.getConteudo() //da pra retirar e chamar em outra tela
            // await dbStore.getDisciplinas() //da prar retirar e chamar em outra tela
            await metaStore.selectedUser(this.user.uid)
            // dbStore.getConcursos()
            // await metaStore.getAllMetasAllUsers() //da prar retirar e chamar em outra tela tarefas das metas

        } catch (error) {
            console.log('erro initializar', error);
        } finally {
            this.loadAll = false
        }
    },
    async fetchUser() {
        this.load = true;
        this.userData = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ id: 1, name: 'João' });
          }, 2000); // Simulação de 1 segundo
        });
        this.load = false;
    },
    async addUsers(){
        this.load = true
        try {
            const objetoUser = {
                name: this.user.email.split('@')[0],
                email: this.user.email,
                uid: this.user.uid
            }
            await setDoc(doc(db, 'usuarios', objetoUser.uid), objetoUser)

        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getUser(){ 
        try {
            const q = query(collection(db, 'usuarios'), where('uid', '==', this.readUser.uid))
            const querySnapshot = await getDocs(q); 

            if (!querySnapshot.empty) {
                this.userDados = {};
                const doc = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
                this.userDados = { id: doc.id, ...doc.data() };
                return { ...this.userDados }
            } else {
                return {}
            }
            
        } catch (error) {
            console.log('error getUser');
            this.userDados = {};
        }
    },
    async setTypeUser(typeUser) {
        const uid = this.readUser.uid
      try {
        const docRef = doc(db, 'usuarios', uid)
        const docSpan = await getDoc(docRef)

        if(!docSpan.exists()) {
            throw new Error("nao existe doc")
        }
        await updateDoc(docRef, {
            type: typeUser.type,
            area: typeUser.area
        })
      } catch (error) {
        console.log('error setTypeUser');
      }
    }
  }
})
