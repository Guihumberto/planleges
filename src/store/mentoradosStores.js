import { defineStore } from 'pinia'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, onSnapshot, query, where, Timestamp, orderBy, limit, getDocs, startAfter } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

import { useRegisterStore } from '@/store/useRegisterStore'

export const useMentorandosStores = defineStore('mentorandosStores', {
    state: () => ({
        mentorandos: [],
        load: false,
        solicitations: [],
    }),
    getters:{
      readMentorandos(){
          return this.mentorandos.filter(x => !x.rejected)
      },
      readMentorandosAnalise(){
        return this.readMentorandos.filter(x => !x.mentor_accepted)
      },
      readMentorandosAceitos(){
        return this.readMentorandos.filter(x => x.mentor_accepted && x.mentorado_accepted)
      },
      readLoad(){
          return this.load
      },
      readSolicitations(){
          return this.solicitations
      } 
    },
    actions:{
        async getMentor(uid){ 
            try {
                const q = query(collection(db, 'usuarios'), where('uid', '==', uid))
                const querySnapshot = await getDocs(q); 
    
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
                    return { id: doc.id, ...doc.data() };
                } 
            } catch (error) {
                console.log('error getMentor');
            }
        },
        async addMentorados(item){
            this.load = true
            const isExistUser = await this.isMentoradoExist(item)
            const isMyGroup = await this.isMentoraAddMyGroup(item)

            if(!isExistUser) {
                console.log('user not exist');
                return 'user_not_exist'
            }
            if(isMyGroup) {
                console.log('group exist');
                return 'group_exist'
            }

            try {
                const userStore = useRegisterStore()
                const uid = userStore.readUser?.uid
                if(!uid) return
                const mentorado = {
                    id_mentor: uid,
                    id_mentorado: isExistUser.uid,
                    name: isExistUser.name,
                    email: isExistUser.email,
                    mentor_accepted: true,
                    mentorado_accepted: true,
                    date_created: Date.now(),
                    rejected: false,
                }
                await addDoc(collection(db, 'mentores_mentorandos'), mentorado)
                return 'success'
            } catch (error) {
                console.log(error);
            } finally {
                this.load = false
            }
        },
        async getMentoradosGroup(){
            this.load = true
            const userStore = useRegisterStore()
                const uid = userStore.readUser?.uid
            try {
                await onSnapshot(
                    collection(db, 'mentores_mentorandos'), 
                    where('id_mentorado', '==', uid), 
                    // where('rejected', '==', false), 
                    (querySnapshot) => {
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
        //Verificação
        async isMentoradoExist(item){
            try {
                const q = query(collection(db, 'usuarios'), where('email', '==', item))
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
                    return { id: doc.id, ...doc.data() };
                }
        
                return null;

            } catch (error) {
                console.log('error isExist');
                return null;
            }
        },
        async isMentoraAddMyGroup(item){
            const userStore = useRegisterStore()
            try {
                const uid = userStore.readUser?.uid
                const q = query(collection(db, 'mentores_mentorandos'), where('uid', '==', item))
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
                    return { id: doc.id, ...doc.data() };
                }
        
                return null;

            } catch (error) {
                console.log('error group exist');
                return null
            }   
        },
        //enviar convite
        async sendInvite(item){
            const userStore = useRegisterStore()
            const uid = userStore.readUser?.uid
            const isExistUser = userStore.readUserDados
            if(!uid) return
            try {
               const mentorado = {
                    id_mentor: item,
                    id_mentorado: uid,
                    name: isExistUser.name,
                    email: isExistUser.email,
                    mentor_accepted: false,
                    mentorado_accepted: true,
                    date_created: Date.now(),
                    rejected: false,
               }
               
               console.log('mentorad', mentorado);

               await addDoc(collection(db, 'mentores_mentorandos'), mentorado)
               return 'success'
            } catch (error) {
                console.log('error sendInvite', error);
            }
        },
        async solicitationOpenOne(item){
            const userStore = useRegisterStore()
            const uid = userStore.readUser?.uid
            if(!uid) return
            
            try {
                const q = query(
                            collection(db, 'mentores_mentorandos'), 
                            where('id_mentorado', '==', uid),
                            where('id_mentor', '==', item),
                        )
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
                    return { id: doc.id, ...doc.data() };
                } 

            } catch {
                console.log('error solicitationOpen');
            } 
        },
        async solicitationOpenAll(item){
            this.load = true
            const userStore = useRegisterStore()
            const uid = userStore.readUser?.uid
            if(!uid) return
            
            try {
                const q = query(
                            collection(db, 'mentores_mentorandos'), 
                            where('id_mentorado', '==', uid)
                        )
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        this.solicitations.push({id: doc.id, ...doc.data()})
                    })
                } 

            } catch {
                console.log('error solicitationOpen');
            } finally {
                this.load = false
            }
        },
        //avaliar pedido
        async avaliarPedido(item){
            const userStore = useRegisterStore()
            const uid = userStore.readUser?.uid
         
            if(!uid) return

            try {
                const docRef = doc(db, 'mentores_mentorandos', item.itemId)
                const docSpan = await getDoc(docRef)

                if(!docSpan.exists()) {
                    throw new Error("nao existe doc")
                }

                if(item.id == 1){
                    await updateDoc(docRef, {
                        mentor_accepted: true,
                        date_accepted: Date.now()
                    })
                }

                if(item.id == 2){
                    await updateDoc(docRef, {
                        rejected: true,
                        date_rejected: Date.now()
                    })
                }

            } catch {
                console.log('error avaliarPedido');
            }
        }
    }
})