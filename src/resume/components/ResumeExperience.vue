<template>
    <section class="experience">
        <h2>Professional Experience</h2>
        <div class="job" v-for="job in jobs">
            <div class="info">
                <div class="company-city">
                    <em>{{ job.company }}</em
                    >, {{ job.city }}
                </div>
                <div class="positions">
                    <div class="position" v-for="position in job.positions">
                        <div class="title">
                            <strong>{{ position.title }}</strong>
                        </div>
                        <div class="dates">{{ position.dates }}</div>
                    </div>
                </div>
            </div>
            <ul>
                <li v-for="bulletpoint in job.bulletpoints">
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

.job ul {
    @include bulletpoints();
}

.position {
    display: flex;
    justify-content: space-between;

    .title {
        flex: 1;
    }
}

@include on-medium-screen-and-paper {
    .job > .info {
        display: flex;
        flex-flow: column wrap;
    }

    .job > .info > .company-city {
        align-self: flex-start;
        width: 50%;
    }
}
</style>
