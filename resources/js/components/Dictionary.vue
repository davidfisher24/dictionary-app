<template>
    <div class="form-signin">
        <img :src="'/img/origin_data_logo.svg'" width="300" height="65" >
        <h1 class="h5 mb-5 font-weight-normal text-right">word dictionary</h1>

        <div class="card mb-5 item" style="max-width: 540px;" v-for="(word, index) in words" v-if="index === currentTab">
            <div class="row no-gutters">
                <div class="col-md-4 pt-4" v-if="word.image_url">
                    <img :src="word.image_url" class="card-img" alt="word-image-alt-demo">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{word.type}}</h5>
                        <p class="card-text">{{word.definition}}</p>
                    </div>
                </div>
                <div class="card-footer col-md-12">
                    <div class="row no-gutters">
                        <div class="col-md-3">
                            <b-button pill id="previous-button" variant="outline-secondary float-left" v-if="words.length > 1 && currentTab > 0" @click="currentTab -= 1">Previous</b-button>
                        </div>
                        <div class="col-md-6">
                            <p class= "text-center">Result {{ index + 1 }} of {{ words.length }}</p>
                        </div>
                        <div class="col-md-3">
                            <b-button pill id="next-button"  variant="outline-secondary float-right" v-if="words.length > 1 && currentTab < (words.length - 1)" @click="currentTab += 1">Next</b-button>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div class="card mb-5 noitems" style="max-width: 540px;" v-if="words.length === 0 && searched">
            <div class="row no-gutters">
                <div class="col-md-12">
                    <div class="card-body">
                        <h5 class="card-title">No Results</h5>
                        <p class="card-text">Sorry. No definitions found for this word</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-label-group">
            <input type="word" id="word" class="form-control" placeholder="Type a word" v-model="query">
            <label for="word">Type a word</label>
        </div>
      <button class="btn btn-lg btn-primary btn-block searchWord" type="button" @click="search">Search</button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {

        data () {
            return {
                query: '',
                searched: false,
                currentTab: 0
            }
        },

        computed: {
            ...mapGetters([
                'words'
            ])
        },

        watch: {
            words() {
                this.searched = true
                this.currentTab = 0
            }
        },

        methods: {
            search () {
                this.$store.dispatch('fetchWords', this.query)
            }
        }

    }
</script>
