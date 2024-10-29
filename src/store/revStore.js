import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, where, query, getDocs } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { nanoid } from 'nanoid'

import { useRegisterStore } from '@/store/useRegisterStore'

export const useRevStore = defineStore('revStore', {
  state: () => ({
    listRevs: [],
    listAllRevs: [],
    types: ['comentario', 'jurisprudencia', 'doutrina', 'legislacao'],
    loadFav: false,
    load: false,
    dadosRev: null,
    favoritos: [],
    markRevUser: [],
    loadCrud: false,
    favoritosList: [],
    revMarkList: [],
    listIdVinculados: [],
    conteudos: []
  }),
  getters:{
    readTypes(){
        return this.types
    },
    readListRevs(){
      return this.listRevs
    },
    readAllListRevs(){
      return this.listAllRevs
    },
    readDadosRev(){
      return this.dadosRev
    },
    readLoad(){
      return this.load
    },
    readLoadCrud(){
      return this.loadCrud
    },
    readLoadFav(){
      return this.loadFav
    },
    readFavoritos(){
      return this.favoritos
    },
    readMarkRevUser(){
      return this.markRevUser
    },
    readFavList(){
      const list = this.favoritosList
      let newList = []

      Object.entries(list).forEach(([key, value]) => {
        let objeto = {
          id: value.id,
          active: value.active
        }
        newList.push(objeto)
      });

      return newList
    },
    readRevMarkList(){
      const list = this.revMarkList
      let newList = []

      Object.entries(list).forEach(([key, value]) => {
        let objeto = {
          id: value.id,
          active: value.active
        }
        newList.push(objeto)
      });

      return newList
    },
    readConteudos(){
      return this.conteudos
    }
  },
  actions:{
    async getRev(item){
      this.load = true
      this.listRevs = []
      try {
        const q = query(collection(db, 'listRev'), where('idVinculado', '==', item))
        const querySnapshot = await getDocs(q)
          this.listRevs = []
          querySnapshot.forEach((doc) => {
              this.listRevs.push({idU:doc.id, ...doc.data()})
          })
      } catch (error) {
        console.log(error)
      } finally {
        this.load = false
      }
    },
    async addRev(item){
        this.loadCrud = true
        const uid = await userStore.user?.uid
        try {
          const id = nanoid(6)
          const objConteudo = {
              dateCreated: Date.now(),
              id,
              questions: item.questions,
              textrev: item.textrev,
              title: item.title,
              type: item.type,
              idVinculado: item.idVinculado,
              uid_user: uid
          }
          const docRef = await addDoc(collection(db, 'listRev'), objConteudo)
          this.listRevs.unshift({idU:docRef.id, ...objConteudo})

        } catch (error) {
            console.log(error);
        } finally {
            this.loadCrud = false
        }
    },
    async getDadosRev(item){
      this.load = true
      this.dadosRev = null
      try {
        const docRef = doc(db, 'conteudo', item)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.dadosRev = {idU: docSnap.id, ...docSnap.data()}
        } else {
          console.log("documento não encontrado!");
        }
      } catch (error) {
        console.log('error getDadosRev')
      } finally {
        this.load = false
      }
    },
    async deleteRev(item){
      this.loadCrud = true
      try {
          const docRef = doc(db, 'listRev', item)
          await deleteDoc(docRef)
          this.listRevs = this.listRevs.filter(x => x.idU != item)
      } catch (error) {
          console.log(error);
      }finally{
          this.loadCrud = false
      }
    },
    async editRev(item, edit){
        this.loadCrud = true
        try {
            const docRef = doc(db, 'listRev', item.idU)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            // if(docSpan.data().user !== auth.currentUser.uid){
            //     throw new Error("nao pertence este doc")
            // }

            await updateDoc(docRef, {
                title: edit.title,
                textrev: edit.textrev
            })

            this.listRevs = this.listRevs.map( x => x.idU == item.idU ? ({ ...item, title: edit.title, textrev: edit.textrev}) : x)

        } catch (error) {
            console.log(error);
        }finally{
          this.loadCrud = false
        }
    },
    async editRevTagQuestion(item){
      this.loadCrud = true
      try {
          const docRef = doc(db, 'listRev', item.idU)
          const docSpan = await getDoc(docRef)

          if(!docSpan.exists()) {
              throw new Error("nao existe doc")
          }

          await updateDoc(docRef, item)

          this.listRevs = this.listRevs.map( x => x.idU == item.idU ? item : x)

      } catch (error) {
          console.log(error);
      }finally{
        this.loadCrud = false
      }
    },
    async getFavUser(){
      const userStore = useRegisterStore()
      try {
        this.loadCrud = true
        const uid = await userStore.user.uid
        const db = getDatabase();

        const resp = ref(db, 'users/' + uid + '/favoritos');
        onValue(resp, (snapshot) => {
          const data = snapshot.val();
          this.favoritosList = data
        });

      } catch (error) {
        console.log('err fb fav');
      } finally {
        this.loadCrud = false
      }
    },
    async getMarkRevUser(){
      const userStore = useRegisterStore()

      try {
        this.loadCrud = true
        const uid = await userStore.user.uid
        const db = getDatabase();

        const resp = ref(db, 'users/' + uid + '/favoritos');
        onValue(resp, (snapshot) => {
          const data = snapshot.val();
          this.revMarkList = data
        });

      } catch (error) {
        console.log('err fb amark');
      } finally {
        this.loadCrud = false
      }
    },
    async addFavUser(item){
      this.loadFav = true
      try {
          const docRef = doc(db, 'listRev', item.idU)
          const docSpan = await getDoc(docRef)

          if(!docSpan.exists()) {
              throw new Error("nao existe doc")
          }
          await updateDoc(docRef, {
              fav: item.fav
          })
      } catch (error) {
          console.log('error dfav');
      }finally{
          this.loadFav = false
      }
    },
    async addMarkRevUser(item){
      this.loadFav = true
      try {
          const docRef = doc(db, 'listRev', item.idU)
          const docSpan = await getDoc(docRef)

          if(!docSpan.exists()) {
              throw new Error("nao existe doc")
          }
          await updateDoc(docRef, {
            revMark: item.revMark
          })
      } catch (error) {
          console.log('error mark rev');
      }finally{
          this.loadFav = false
      }
    },
    async getAllConteudo(){
      const userStore = useRegisterStore()
      const uid = await userStore.user?.uid
      try {
          const q = query(collection(db, 'conteudo'), where('uid_user', '==', uid));
          await onSnapshot(q, (querySnapshot) => {
              this.conteudos = []
              querySnapshot.forEach((doc) => {
                  this.conteudos.push({id_conteudo: doc.id, details: false, ...doc.data()})
                  this.getAllRev(doc.id)
              })
          })
          await this.getAllRev()
      } catch (error) {
          console.log('error');
      } finally {
        console.log('final');
      }
    },
    async getAllRev(item){
      try {
          const q = query(collection(db, 'listRev'), where('idVinculado', '==', item))
          const querySnapshot = await getDocs(q)
            this.listAllRevs = []
            querySnapshot.forEach((doc) => {
                this.listAllRevs.push({idU:doc.id, ...doc.data()})
            })
      } catch (error) {
        console.log('error')
      }
    },
  },
})
