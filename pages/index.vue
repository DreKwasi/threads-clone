<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const user = useSupabaseUser()

const posts = ref([])
const isPosts = ref(false)
const isLoading = ref(false)

onBeforeMount(async () => {
    isLoading.value = true
    try {
        await userStore.getAllPosts()
    } catch (error) {
        console.log(error)
    }
    isLoading.value = false

})

onMounted(() => {
    watchEffect(() => {
        if (!user.value) {
            console.log(user.value)
            return navigateTo('/auth')
        }
        posts.value = userStore.posts

        if (userStore.posts && userStore.posts.length >= 1) {
            isPosts.value = true
        }
        else {
            isPosts.value = false
        }
    })
})

watch(() => posts.value, () => {
    posts.value = userStore.posts

    if (userStore.posts && userStore.posts.length >= 1) {
        isPosts.value = true
    }
    else {
        isPosts.value = false
    }
}, { deep: true })

</script>

<template>
    <MainLayout>
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-x-[500px] overflow-hiden">
                <div id="Posts" class="px-4 max-w-[600px] mx-auto">
                    <div v-if="isPosts" v-for="post in posts" :key="post">
                        <Post :post="post" @isDeleted="posts = userStore.getAllPosts()" />
                    </div>
                    <div v-else>
                        <client-only>
                            <div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">
                                    <Icon name="eos-icons:bubble-loading" size="50" color="#ffffff" />
                                    <div class="w-full mt-1">Loading...</div>
                                </div>
                            </div>
                            <div v-if="!isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">
                                    <Icon name="tabler:mood-empty" size="50" color="#ffffff" />
                                    <div class="w-full">Make the first post!</div>
                                </div>
                            </div>
                        </client-only>
                    </div>
                    <div class="mt-60" />
                </div>
            </div>
        </div>
    </MainLayout>
</template>