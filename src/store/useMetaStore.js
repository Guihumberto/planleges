import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import router from '@/router'

import { useDbStore } from '@/store/dbStore'
const dbStore = useDbStore()

export const useMetaStore = defineStore('metaStore', {
  state: () => ({
    mentorandos: [],
    load: false,
    metas: [],
    meta: null,
    tarefas: [],
    selected: null,
    orientacoes: [],
    bancas: [
        {id: 1, name: 'CESPE'},
        {id: 2, name: 'FGV'},
        {id: 3, name: 'FCC'},
        {id: 4, name: 'FGV'}
    ],
    disciplinas : [
        {id: 0, name: 'Selecione uma Disciplina'},
        {id: 1, name: 'Direito Administrativo'},
        {id: 2, name: 'Direito Constitucional'},
        {id: 3, name: 'Português'},
        {id: 4, name: 'Direito Tributário'},
        {id: 5, name: 'Direito Civil'},
        {id: 6, name: 'Processo Civil'},
        {id: 7, name: 'Direito Ambiental'},
        {id: 8, name: 'Direito Previdenciário'},
        {id: 9, name: 'Administração Financeira Orçamentária'},
        {id: 10, name: 'Administração Pública'},
        {id: 11, name: 'Administração GEral'},
    ],
    type_study : [
        {id:1, name: 'Vídeo', icon: 'mdi-video-box', color: "red"},
        {id:2, name: 'Leitura', icon: 'mdi-text-box', color: "indigo"},
        {id:3, name: 'Lei seca', icon: 'mdi-scale-balance', color: "orange"},
        {id:4, name: 'Questões', icon: 'mdi-list-status', color: "primary"},
        {id:5, name: 'Revisão', icon: 'mdi-alpha-r-box', color: "secondary"},
        {id:6, name: 'Outros', icon: 'mdi-more', color: "grey"},
    ],
    type_questoes : [
        {id:1, name: 'Certo/errado', icon: 'mdi-list-status', color: "primary"},
        {id:2, name: 'Multipla Escola', icon: 'mdi-playlist-check', color: "red"},
        {id:3, name: 'Misturadas', icon: 'mdi-playlist-plus', color: "grey"}
    ]
  }),
  getter:{
    readMentorandos(){
        return this.mentorandos
    },
    readOrientacoes(){
        return this.orientacoes
    }
  },
  actions:{
    async getMentorandos(){
        this.load = true
        try {
            await onSnapshot(collection(db, 'usuarios'), (querySnapshot) => {
                this.mentorandos = [];
                querySnapshot.forEach((doc) => {
                    this.mentorandos.push({id: doc.id, ...doc.data()})
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async addMeta(item){
        this.load = true
        try {
            const meta = { ...item }
            await addDoc(collection(db, 'metas'), meta)

        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getMetas(){
        this.load = true
        try {
            const q = query(collection(db, 'metas'), where('user', '==', this.selected));
            await onSnapshot(q, (querySnapshot) => {
                this.metas = [];
                querySnapshot.forEach((doc) => {
                    this.metas.push({id: doc.id, ...doc.data()})
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
        
    },
    async getMeta(idMeta){
        this.load = true
        try {
            await onSnapshot(doc(db, 'metas', idMeta), (doc) => {
                this.meta = {id:doc.id, ...doc.data()}
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    selectedUser(item){
        this.selected = item
        this.getMetas()
    },
    async editMeta(item){
        this.load = true
        try {
            const docRef = doc(db, 'metas', this.meta.id)
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
    async addOrientacao(item){
        this.load = true
        try {
            const orientacao = { ...item }
            await addDoc(collection(db, 'orientacaoes'), orientacao)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getOrientacoes(){
        this.load = true
        try {
            await onSnapshot(collection(db, 'orientacaoes'), (querySnapshot) => {
                this.orientacoes = [];
                querySnapshot.forEach((doc) => {
                    this.orientacoes.push({id: doc.id, ...doc.data()})
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
        
    },
    async getDisciplinas(){
        const disicplinas = dbStore.disciplinas
        return disicplinas
    },
    async addTask(item){
        this.load = true
        try {
            const task = { ...item }
            task.date_created = Date.now()
            await addDoc(collection(db, 'tarefas'), task)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getTask(item){
        this.load = true
        try {
            const q = query(collection(db, 'tarefas'), where('id_meta', '==', item));
            await onSnapshot(q, (querySnapshot) => {
                this.tarefas = [];
                querySnapshot.forEach((doc) => {
                    this.tarefas.push({id: doc.id, details: false, ...doc.data()})
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async concluirTask(item){
        this.load = true
        try {
            const docRef = doc(db, 'tarefas', item.id)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            await updateDoc(docRef, {
                task_done: item.task_done,
                date_done: Date.now()
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async concluirRev(item){
        this.load = true
        try {
            const docRef = doc(db, 'tarefas', item.id)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            await updateDoc(docRef, {
                rev_done: item.rev_done,
                dare_rev: Date.now()
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async liberarMeta(item){
        this.load = true
        try {
            const docRef = doc(db, 'metas', item.id)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            await updateDoc(docRef, {
                show: item.show,
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    }
  }
})
