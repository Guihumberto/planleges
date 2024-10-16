import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, query, where, Timestamp } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

export const useNotificacaoStore = defineStore('notifcationStore', {
  state: () => ({
    notifacoes: [],
    load: false,
  }),
  getters:{
    readNotificacoes(){
        return this.notifacoes
    },
    readLoad(){
        return this.load
    },
  },
  actions:{
    async addNotificacoes(item){
        this.load = true
        const objeto = { 
            id: 1, 
            title: item.notification_title, 
            subtitle: item.meta,
            url: item.id,  
            new: true,
            date_created: Date.now(),
            uid: item.user
        }
        console.log(objeto)
        try {
            await addDoc(collection(db, 'notificacoes'), objeto)

        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getNotificacoes(user){
        this.load = true
        try {
            const q = query(collection(db, 'notificacoes'), where('uid', '==', user));
            await onSnapshot(q, (querySnapshot) => {
                this.notifacoes = [];
                querySnapshot.forEach((doc) => {
                    this.notifacoes.push({id: doc.id, ...doc.data()})
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }    
    },
    async editNotificacao(item){
        this.load = true
        try {
            const docRef = doc(db, 'notificacoes', this.meta.id)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            await updateDoc(docRef, {
                date_created: Date.now(),
                date_start: item.date_start, 
                data_end: item.data_end,
                text_init: item.text_init,
                show: item.show,
                tasks: []
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    }
  }
})
