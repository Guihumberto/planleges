import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, query, where, Timestamp, orderBy, limit, getDocs, startAfter } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

import { useNotificacaoStore } from '@/store/useNotificacaoStore'
const notifcacaoStore = useNotificacaoStore()

import { useDbStore } from '@/store/dbStore'
const dbStore = useDbStore()

import { useRegisterStore } from '@/store/useRegisterStore'

export const useMetaStore = defineStore('metaStore', {
  state: () => ({
    mentorandos: [],
    load: false,
    loadMetas: false,
    metas: [],
    meta: null,
    tarefas: [],
    allTarefas: [],
    selected: null,
    orientacoes: [],
    bancas: [
        {id: 1, name: 'CESPE'},
        {id: 2, name: 'FGV'},
        {id: 3, name: 'FCC'},
        {id: 4, name: 'CESGRANRIO'},
        {id: 5, name: 'CONSULPLAN'},
        {id: 98, name: 'VÁRIAS'},
        {id: 99, name: 'Outras'}
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
        {id: 11, name: 'Administração Geral'},
        {id: 12, name: 'Gestão de Pessoas'},
        {id: 13, name: 'Gestão de Projetos'},
        {id: 14, name: 'Gestão de Contratos'},
        {id: 15, name: 'Engenharia de Software'},
        {id: 16, name: 'Engenharia de Dados'},
        {id: 17, name: 'Auditoria Governamental'},
        {id: 18, name: 'Legislação Aplicável ao TCE'},
        {id: 19, name: 'Ciência de Dados'},
        {id: 20, name: 'Controle Externo'},
        {id: 21, name: 'Desenvolvimento de Sistemas'},
        {id: 22, name: 'Governança de TI'},
        {id: 23, name: 'Análise de Dados'},
        {id: 24, name: 'Inglês'},
        {id: 25, name: 'Raciocínio Lógico'},
        {id: 26, name: 'Matemática'},
        {id: 27, name: 'Atualidades'},
        {id: 28, name: 'Legislação'},
        {id: 29, name: 'Estatística'},
        {id: 30, name: 'Informática'},
        {id: 31, name: 'Comunicação Social'},
        {id: 32, name: 'Legislação SUS'},
        {id: 33, name: 'Enfermagem'},
        {id: 34, name: 'Ética Profissional Enfermagem'},
        {id: 35, name: 'Legislação EBESERH'},
        {id: 36, name: 'Direito Sanitário'},
        {id: 37, name: 'Ética e Legislação'},
        {id: 38, name: 'Administração de Materiais'},
        {id: 39, name: 'Contabilidade Pública'},
        {id: 40, name: 'Biomedicina'},
        {id: 41, name: 'POLÍTICAS PÚBLICAS DE SAÚDE E EDUCAÇÃO'},
        {id: 42, name: 'Direito Penal'},
        {id: 43, name: 'Direito Processual Penal'},
        {id: 44, name: 'Direito do Trabalho'},
        {id: 45, name: 'Direito Processual do Trabalho'},
        {id: 46, name: 'Direito Empresarial'},
        {id: 46, name: 'Legislação Sobre Educação e Ciência, Tecnologia e Inovação'},
        {id: 99, name: 'Várias Disciplinas'},
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
    ],
    priority: [
        {id:1, name: 'Baixa', icon: 'mdi-arrow-down-drop', color: 'grey'},
        {id:2, name: 'Média', icon: 'mdi-minus-thick', color: 'black'},
        {id:3, name: 'Alta', icon: 'mdi-arrow-up-drop', color: 'orange'},
        {id:4, name: 'Relevante', icon: 'mdi-exclamation-thick', color: 'red'}
    ],
    periodos:[2025, 2024],
    loadTasksMeta: false,
    allMetasAllUsers: [],
    //firebase
    lastVisible: null, // Armazena o último documento carregado
    hasMore: true, // Indica se há mais documentos para carregar
    pageSize: 10, // Quantidade de documentos por página
  }),
  getters:{
    readMentorandos(){
        return this.mentorandos
    },
    readOrientacoes(){
        return this.orientacoes
    },
    readLoad(){
        return this.load
    },
    readLoadMetas(){
        return this.loadMetas
    },
    readMetas() {
        return this.metas
    },
    readMeta() {
        return this.meta
    },
    readAllTarefas(){
        return this.allTarefas
    },
    readloadTasksMeta(){
        return this.loadTasksMeta
    },
    readAllMetasAllUsers(){
        return this.allMetasAllUsers
    },
    readBancas(){
        return this.bancas
    },
    readPeriodos(){
        return this.periodos
    },
    readDisciplinas(){
        return this.disciplinas
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
            const meta = { ...item, date_created: Date.now() }
            await addDoc(collection(db, 'metas'), meta)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async getMetas(initialLoad = false){
        this.loadMetas = true
        const userStore = useRegisterStore()
        const uid =  userStore.readUser?.uid

        if(!uid) return  
 
        try {
            let q;

            if (initialLoad) {
                // Primeira carga: pega os primeiros `pageSize` documentos
                q = query(
                    collection(db, "metas"),
                    where("user", "==", uid),
                    orderBy("date_created", "desc"),
                    limit(this.pageSize)
                );
            } else {
                // Carrega mais documentos a partir do último carregado
                if (!this.lastVisible) return;

                q = query(
                    collection(db, "metas"),
                    where("user", "==", uid),
                    orderBy("date_created", "desc"),
                    startAfter(this.lastVisible), // Começa do último documento carregado
                    limit(this.pageSize)
                );
            }

            const querySnapshot = await getDocs(q);

            if (initialLoad) {
                this.metas = []; // Se for a primeira carga, limpa o array
            }

            querySnapshot.forEach((doc) => {
                this.metas.push({ id: doc.id, ...doc.data() });
            });

            // await onSnapshot(q, (querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
            //         this.metas.push({ id: doc.id, ...doc.data() });
            //     })
            // })

            // Atualiza o último documento carregado
            this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

            // Verifica se ainda há mais documentos para carregar
            this.hasMore = querySnapshot.docs.length === this.pageSize;

            // this.rodarMetas()
            
        } catch (error) {
            console.log(error);
        } finally {
            this.loadMetas = false
        }    
    },
    async getMetasMentorando(item){
        this.loadMetas = true
        const userStore = useRegisterStore()
        const uid = userStore.readUser?.uid
        if(!uid) return
        try {
            const  q = query(
                collection(db, "metas"),
                where("user", "==", item),
                orderBy("date_created", "desc"),
                limit(this.pageSize)
            )

            await onSnapshot(q, (querySnapshot) => {
                this.metas = []
                querySnapshot.forEach((doc) => {
                    this.metas.push({ id: doc.id, ...doc.data() });
                })
            })

        } catch (error) {
            console.log('erro getMentorando', error);
        } finally {
            this.loadMetas = false
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
        this.metas = []
        this.selected = item
        this.getMetas(true, item)
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
    async concluirMeta(item, value){
        this.load = true
        try {
            const docRef = doc(db, 'metas', item)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            await updateDoc(docRef, {
                meta_done: value
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
    async deleteMeta(item){
        this.load = true
        try {
            const docRef = doc(db, 'metas', item)
            await deleteDoc(docRef)
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
            item.notification_title = "Uma nova meta foi liberada"
            if(item.show) notifcacaoStore.addNotificacoes(item)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async editar_task(item){
        this.load = true
        const tarefa = {...item}
        tarefa.date_update = Date.now()
        delete tarefa.date_created
        delete tarefa.id
        delete tarefa.details

        try {
            const docRef = doc(db, 'tarefas', item.id)
            const docSpan = await getDoc(docRef)

            if(!docSpan.exists()) {
                throw new Error("nao existe doc")
            }
            await updateDoc(docRef, tarefa)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    async deleteTask(item){
        this.load = true
        try {
            const docRef = doc(db, 'tarefas', item)
            await deleteDoc(docRef)
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }
    },
    rodarMetas(){
        this.allTarefas = []
        this.readMetas.forEach(x => {
            this.getTaskMeta(x.id)
        })
    },
    async getTaskMeta(item){
        this.loadTasksMeta = true
        try {
            const q = query(collection(db, 'tarefas'), where('id_meta', '==', item));
            await onSnapshot(q, (querySnapshot) => {
                this.allTarefas = []
                querySnapshot.forEach((doc) => {
                    this.allTarefas.push({id: doc.id, details: false, ...doc.data()})
                })
            })
        } catch (error) {
            console.log('error');
        } finally {
             this.loadTasksMeta = false
        }
      
    },
    async getAllMetasAllUsers(){
        console.log('getAllMetasAllUsers');
        this.load = true
        try {
            const q = query(collection(db, 'tarefas'));
            await onSnapshot(q, (querySnapshot) => {
                this.allMetasAllUsers = [];
                querySnapshot.forEach((doc) => {
                    this.allMetasAllUsers.push({id: doc.id, ...doc.data()})
                })
            })
            this.rodarMetas()
        } catch (error) {
            console.log(error);
        }finally{
            this.load = false
        }    
    },
  }
})
