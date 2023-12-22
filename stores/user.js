export const useUserStore = defineStore('user', () => {
    const posts = useState('posts', () => [])
    const isMenuOverlay = useState('isMenuOverlay', () => false)
    const isLogoutOverlay = useState('isLogoutOverlay', () => false)

    const getAllPosts = async () => {
        let res = await useFetch('/api/get-all-posts')
        posts.value = res.data
        return res.data
    }

    return { posts, isMenuOverlay, isLogoutOverlay, getAllPosts }


})