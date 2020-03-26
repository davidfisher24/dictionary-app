import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

const state = {
    words: []
};

const getters = {
    words: state => {
         return state.words
     }
};

const mutations = {
    FETCH_WORDS(state, words) {
        return state.words = words
    },
}

const actions = {
    fetchWords({commit}, query) {
        axios.get(`/api/dictionary/${query}`)
            .then(res => {
                commit('FETCH_WORDS', res.data.definitions)
            }).catch(err => {
                console.log(err)
            })
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
