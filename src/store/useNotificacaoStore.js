import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, query, where, Timestamp, limit, orderBy } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

export const useNotificacaoStore = defineStore('notifcationStore', {
  state: () => ({
    usuario: {},
    notifacoes: [],
    load: false,
  }),
  getters:{
    readUsuario(){
        return this.usuario
    },
    readNotificacoes(){
        return this.notifacoes
    },
    readLoad(){
        return this.load
    },
  },
  actions:{
    async getUsuario(id){
        this.load = true
        try {
                await onSnapshot(doc(db, 'usuarios', id), (doc) => {
                this.usuario = {id:doc.id, ...doc.data()}
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async updateNotificacoes(uid, value){
        this.load = true
        try {
            const docRef = doc(db, 'usuarios', uid)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            await updateDoc(docRef, {
                notificacoes: value,
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
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
        const existeNotificacaoIgual = this.readNotificacoes.find(x => x.url == objeto.url)
        if(existeNotificacaoIgual) return
        try {
            await addDoc(collection(db, 'notificacoes'), objeto)
            this.updateNotificacoes(objeto.uid, true)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getNotificacoes(user){
        this.load = true
        await this.getUsuario(user)
        try {
            const q = query(
                collection(db, 'notificacoes'), 
                where('uid', '==', user),
                orderBy("date_created", "desc"),
                limit(10)
            )
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
    },
    viewNotificacoes(){
        this.updateNotificacoes(this.readUsuario.id, false)
    }
  }
})
