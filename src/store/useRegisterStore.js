import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import router from '@/router'

export const useRegisterStore = defineStore('registerStore', {
  state: () => ({
    user:null,
    load: false
  }),
  getter:{
    readUser(){
        return this.user
    }
  },
  actions:{
    async registerUser(userLogin){
        this.load = true
        try {
            const { user } = await createUserWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            this.user = {email: user.email, uid: user.uid}
            router.push('/config')
        } catch (error) {
            console.log(error);
        } finally{
            this.load = false
        }

    },
    async loginUser(userLogin){
        this.load = true
        try {
            const { user } = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            this.user = {email: user.email, uid: user.uid}
            router.push('/config')
        } catch (error) {
            console.log(error);
        } finally {
            this.load = false
        }
    },
    async logoutUser(){
        this.load = true
        try {
            await signOut(auth)
            this.user = null
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
    }
  }
})