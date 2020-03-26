<template>
    <div class="form-signin">
        <img :src="'/img/origin_data_logo.svg'" width="300" height="65" >
        <h1 class="h5 mb-5 font-weight-normal text-right">word dictionary</h1>

        <div class="card mb-5" style="max-width: 540px;" v-for="word in words">
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
            }
        },

        computed: {
            ...mapGetters([
                'words'
            ])
        },

        methods: {
            search () {
                this.$store.dispatch('fetchWords', this.query)
            }
        }

    }
</script>
