import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'
import { nanoid } from 'nanoid'

export const useDbStore = defineStore('dbStore', {
  state: () => ({
    disciplinas: [],
    concursos: [],
    conteudo:[],
    disciplinaSelect: null,
    load: false
  }),
  getters:{
    readDisciplinas(){   
        return this.disciplinas
    },
    readConcursos(){   
        return this.concursos
    },
    readConteudo(){
        return this.conteudo
    },
    readDisciplinaSel(){
        return this.disciplinaSelect
    }
  },
  actions:{
    async getDisciplinas(){
        this.load = true
        try {
            onSnapshot(collection(db, 'disciplinas'), (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.disciplinas.push(doc.data())
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
        
    },
    async addDisciplina(item){
        this.load = true
        try {
            const objetoDisciplina = {
                nome: item,
                id: nanoid(6)
            }
            const docRef = await addDoc(collection(db, 'disciplinas'), objetoDisciplina)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async deleteDisciplina(item){
        this.load = true
        try {
            console.log("adicionar disciplina", item);
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async editDisciplina(item){
        this.load = true
        try {
            console.log("adicionar disciplina", item);
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getConcursos(){
        this.load = true
        try {
            onSnapshot(collection(db, 'concursos'), (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.concursos.push(doc.data())
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
        
    },
    async addConcurso(item){
        this.load = true
        try {
            const objetoConcurso = {
                nome: item,
                id: nanoid(6)
            }
            const docRef = await addDoc(collection(db, 'concursos'), objetoConcurso)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async deleteConcurso(item){
        this.load = true
        try {
            console.log("adicionar Concurso", item);
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async editConcurso(item){
        this.load = true
        try {
            console.log("adicionar Concurso", item);
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getConteudo(){
        this.load = true
        try {
            onSnapshot(collection(db, 'conteudo'), (querySnapshot) => {
                this.conteudo = []
                querySnapshot.forEach((doc) => {
                    this.conteudo.push({idU:doc.id, ...doc.data()})
                })
            })
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
        
    },
    async addConteudo(item){
        this.load = true
        try {
            const objetoConteudo = {
                name: item,
                id: nanoid(6),
                disciplina: this.disciplinaSelect
            }
            const docRef = await addDoc(collection(db, 'conteudo'), objetoConteudo)
        } catch (error) {
            console.log(error);
        } finally {
            this.load = false
        }
    },
    async deleteConteudo(item){
        this.load = true
        try {
            const docRef = doc(db, 'conteudo', item)
            await deleteDoc(docRef)
            this.conteudo = this.conteudo.filter(x => x.idU != item)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async editConteudo(item, name){
        this.load = true
        try {
            const docRef = doc(db, 'conteudo', item.idU)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            // if(docSpan.data().user !== auth.currentUser.uid){
            //     throw new Error("nao pertence este doc")
            // }

            await updateDoc(docRef, {
                name: name
            })

            this.conteudo = this.conteudo.map( x => x.idU == item.idU ? ({ ...item, name: name}) : x)

        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    disciplinaSel(item){
        this.disciplinaSelect = item
    }
  }
})
