/**
 * @file User Store
 */

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ name: 'user', stateFactory: true, namespaced: true })
export default class User extends VuexModule {
    public username: string = ''
    public id: string = ''
    public user_flag = 0

    @Mutation
    public SET_USER(user: any) {
        this.username = user?.username || ''
        this.id = user?.id || ''
        this.user_flag = user?.user_flag || 0
    }

    get isLogin() {
        return this.id != ''
    }

    get isAdmin() {
        return (this.user_flag & 1) === 1 || (this.user_flag & 2) === 2
    }

    get getUserName() {
        return this.username
    }
}