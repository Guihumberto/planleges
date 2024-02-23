import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, where, query, getDocs } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import { nanoid } from 'nanoid'

export const useRevStore = defineStore('revStore', {
  state: () => ({
    listRevs: [],
    types: ['comentario', 'jurisprudencia', 'doutrina', 'legislacao'],
    load: false,
    dadosRev: null
  }),
  getters:{
    readTypes(){
        return this.types
    },
    readListRevs(){
      return this.listRevs
    },
    readDadosRev(){
      return this.dadosRev
    },
    readLoad(){
      return this.load
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
        this.load = true
        try {
          const id = nanoid(6)
          const objConteudo = {
              dateCreated: Date.now(),
              id,
              questions: item.questions,
              textrev: item.textrev,
              title: item.title,
              type: item.type,
              idVinculado: item.idVinculado
          }
          const docRef = await addDoc(collection(db, 'listRev'), objConteudo)
          this.listRevs.push({idU:docRef.id, ...objConteudo})

        } catch (error) {
            console.log(error);
        } finally {
            this.load = false
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
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        
      } catch (error) {
        console.log(error)
      } finally {
        this.load = false
      }
    },
    async deleteRev(item){
      this.load = true
      try {
          const docRef = doc(db, 'listRev', item)
          await deleteDoc(docRef)
          this.listRevs = this.listRevs.filter(x => x.idU != item)
      } catch (error) {
          console.log(error);
      }finally{
          this.load = false
      }
    },
    async editRev(item, edit){
        this.load = true
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
            this.load = false
        }
    },
  },
})
