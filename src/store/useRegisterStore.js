import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import router from '@/router'

import { useRevStore } from "@/store/revStore";
import { useNotificacaoStore } from '@/store/useNotificacaoStore'
const notifcacaoStore = useNotificacaoStore()


export const useRegisterStore = defineStore('registerStore', {
  state: () => ({
    user: null,
    load: false,
    userData: null, 
    msgError: null
  }),
  getters:{
    readUser(){
        return this.user
    },
    readMsgError(){
        return this.msgError
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
        const revStore = useRevStore()
        this.msgError = null
        try {
            const { user } = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            this.user = {email: user.email, uid: user.uid}
            this.saveUserData()
            await this.getUserData()
            await notifcacaoStore.getNotificacoes(user.uid)
            await revStore.getAllConteudo()
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
        try {
            await signOut(auth)
            this.user = null
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
      const data = localStorage.getItem('userDataRev');
      const revStore = useRevStore()
      if (data) {
          const login = {
              email: JSON.parse(data).email,
              uid: JSON.parse(data).uid
          }
          if(login.email) {
            this.user = {email: login.email, uid: login.uid}
            notifcacaoStore.getNotificacoes(login.uid)
            await revStore.getAllConteudo()
        }
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
  }
})
