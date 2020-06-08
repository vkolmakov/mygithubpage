<template>
    <div class="header">
        <h1>
            <router-link :to="whoami.link" :aria-label="whoami.description">
                <label>{{ whoami.label }}</label> {{ whoami.name }}
            </router-link>
        </h1>
        <ul class="contact">
            <li v-for="(c, idx) in contacts">
                <label :id="`contact-${idx}`" class="visually-hidden">{{
                    c.label
                }}</label>
                <a :href="c.link" :aria-labelledby="`contact-${idx}`"
                    ><icon
                        :kind="c.iconKind"
                        :wrapper-class="c.iconClass"
                    ></icon
                    >{{ c.text }}</a
                >
            </li>
        </ul>
    </div>
</template>

<script>
import Icon from "../../components/Icon.vue";

export default {
    props: {
        data: Object,
    },

    components: {
        Icon,
    },

    data() {
        return this.data;
    },
};
</script>

<style lang="scss">
@import "../mixins";

$github-color: #5d297e;
$linkedin-color: #0077b5;

.header {
    display: flex;
    flex-flow: column nowrap;
}

.header > h1 > a {
    color: #333;
}

.header > h1 > a > label {
    @include visually-hidden;
}

.contact {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    padding: 0;
    margin: 0;
    list-style-type: none;
}

.contact > li > label {
    @include visually-hidden;
}

.icon {
    margin-right: 0.2em;
}

.icon-github {
    fill: $github-color;
}

.icon-linkedin-square {
    fill: $linkedin-color;
}

@include on-medium-screen-and-paper {
    .contact {
        justify-content: flex-end;
    }

    .contact > li {
        width: auto;
        padding-left: 0.75em;
    }
}
</style>
