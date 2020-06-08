<template>
    <section class="projects">
        <h2>Projects</h2>
        <div class="project" v-for="p in projects">
            <h3>{{ p.name }}</h3>
            <ul>
                <li v-for="bulletpoint in p.bulletpoints" v-html="bulletpoint">
                    {{ bulletpoint }}
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        data: Object,
    },

    data() {
        return this.data;
    },
};
</script>

<style lang="scss">
@import "../mixins";
.projects {
    .project {
        a {
            text-decoration: underline;
        }
        h3 {
            @include header();
        }
        ul {
            @include bulletpoints();
        }
    }
}
</style>
