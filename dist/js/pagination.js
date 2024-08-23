const paginationApp = new Vue({
    el: '#pagination-app',
    data: {
        posts: [],
        baseUrl: 'http://127.0.0.1/vue_js/top-headlines.json',
        page: 1,
        perPage: 9,
        pages: [],
    },
    methods: {
        getPosts () {
            axios.get(this.baseUrl)
            .then(response => {
                this.posts = response.data;
            })
            .catch(response => {
                console.log(response);
            });
        },
        setPages () {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  posts.slice(from, to);
        },
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.posts);
        }
    },
    watch: {
        posts () {
            this.setPages();
        }
    },
    created () {
        this.getPosts();
    }
});