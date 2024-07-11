import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import router from '@/router'

import { useRevStore } from "@/store/revStore";


export const useRegisterStore = defineStore('registerStore', {
  state: () => ({
    user: null,
    load: false
  }),
  getter:{
    readUser(){
        return this.user
    },
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
            this.saveUserData()
            await this.getUserData()
            router.push('/config')
        } catch (error) {
            console.log(error);
        } finally {
            this.load = false
        }
    },
    async getUserData(){
        const revStore = useRevStore()
        revStore.getMarkRevUser()
        revStore.getFavUser()
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
    },
    saveUserData() {
      localStorage.setItem('userData', JSON.stringify(this.user));
    },
    loadUserData() {
      const data = localStorage.getItem('userData');
      if (data) {
          const login = {
              email: JSON.parse(data).email,
              uid: JSON.parse(data).uid
          }
          if(login.login) {
            this.user = {email: login.email, uid: login.uid}
          }
      }
    }
  }
})
