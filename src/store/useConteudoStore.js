import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, query, where, Timestamp } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

import { useRegisterStore } from './useRegisterStore'

export const useConteudoStore = defineStore('conteudoStore', {
    state: () => ({
        listEdital: [],
        load: false,
        concurso: null,
        cargos: [],
        disciplinas: [],
        planmain: {
            disciplinas:[]
        }
    }),
    getters:{
      readListEdital(){
          return this.listEdital
      },
      readLoad(){
          return this.load
      },
      radConcurso(){
        return this.concurso
      },
      readCargos(){
        return this.cargos
      },
      readDisciplinas(){
        return this.disciplinas
      },
      readPlanMain(){
        return this.planmain
      }
    },
    actions:{
        async getConcursos(){
            this.load = true
            try {
                await onSnapshot(collection(db, 'concursos'), (querySnapshot) => {
                    this.listEdital = [];
                    querySnapshot.forEach((doc) => {
                        this.listEdital.push({idU: doc.id, ...doc.data()})
                    })
                })
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async getConcurso(id){
            this.load = true
            try {
                    await onSnapshot(doc(db, 'concursos', id), (doc) => {
                    this.concurso = {idU:doc.id, ...doc.data()}
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
                const concurso = { ...item, date_created: Date.now() }
                await addDoc(collection(db, 'concursos'), concurso)
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async deleteConcurso(item){
            this.load = true
            try {
                const docRef = doc(db, 'concursos', item)
                await deleteDoc(docRef)
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async editConcurso(item){
            this.load = true
            try {
                const docRef = doc(db, 'concursos', item.idU)
                const docSpan = await getDoc(docRef)
    
                if(!docSpan.exists()) {
                    throw new Error("nao existe doc")
                }
                delete item.idU
                await updateDoc(docRef, {
                    ...item
                })
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        clearConcurso(){
            this.concurso = [];
        },
        async getCargos(item){
            this.load = true
            try {
                const q = query(collection(db, 'cargos'), where('id_concurso', '==', item));
                await onSnapshot(q, (querySnapshot) => {
                    this.cargos = [];
                    querySnapshot.forEach((doc) => {
                        this.cargos.push({id: doc.id, ...doc.data()})
                    })
                })
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async addCargo(item){
            this.load = true
            try {
                const cargo = { ...item, date_created: Date.now() }
                await addDoc(collection(db, 'cargos'), cargo)
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async deleteCargo(item){
            this.load = true
            try {
                const docRef = doc(db, 'cargos', item)
                await deleteDoc(docRef)
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        clearCargo(){
            this.cargos = [];
        },
        async getDisciplinasEmenta(item){
            console.log('item', item);
            this.load = true
            try {
                const q = query(collection(db, 'disciplinasEmenta'), where('id_cargo', '==', item));
                await onSnapshot(q, (querySnapshot) => {
                    this.disciplinas = [];
                    querySnapshot.forEach((doc) => {
                        this.disciplinas.push({id: doc.id, ...doc.data()})
                    })
                })
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async addDisciplinasEmenta(item){
            this.load = true
            try {
                const disciplina = { ...item, date_created: Date.now() }
                await addDoc(collection(db, 'disciplinasEmenta'), disciplina)
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async deleteDiciplinaEmenta(item){
            this.load = true
            try {
                const docRef = doc(db, 'disciplinasEmenta', item)
                await deleteDoc(docRef)
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        clearDisciplinasEmenta(){
            this.disciplinas = [];
        },
        async savePlanUser(item){
            this.load = true
            const userStore = useRegisterStore()
            const uid = userStore.readUser.uid
            try {
                const plan = { ...item, date_created: Date.now(), id_user: uid }
                const res = await addDoc(collection(db, 'planUser'), plan)
                await this.updatePlanUseMain(uid, res.id)
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async updatePlanUseMain(uid, value){
            try {
                const docRef = doc(db, 'usuarios', uid)
                const docSpan = await getDoc(docRef)
    
                if(!docSpan.exists()) {
                    throw new Error("nao existe doc")
                }
                await updateDoc(docRef, {
                    planmain: value,
                })
            } catch (error) {
                console.log(error);
            }
        },
        async getPlanMain(){
            this.load = true
            const userStore = useRegisterStore()
            const id = userStore.readUserDados.planmain
            try {
                    await onSnapshot(doc(db, 'planUser', id), (doc) => {
                    this.planmain = {id:doc.id, ...doc.data()}
                })
            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        },
        async updatePlanUser(item){
            this.load = true
            try {
                const id = this.readPlanMain.id

                const docRef = doc(db, 'planUser', id)
                const docSpan = await getDoc(docRef)
    
                if(!docSpan.exists()) {
                    throw new Error("nao existe doc")
                }
                await updateDoc(docRef, {
                    disciplinas: item,
                })

            } catch (error) {
                console.log(error);
            }finally{
                this.load = false
            }
        }
    }
})
