<template>
    <main class="main-container">
        <h1>This page does not exist.</h1>
        <nav class="nav">
            <router-link class="link" to="/">Back to vkolmakov.me</router-link>
        </nav>
    </main>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400");

.main-container {
    font-family: "Open Sans", "Helvetica Neue", "Arial", sans-serif;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
    max-width: 50em;

    line-height: 1.5;
    padding: 4em 1em;
}

.nav {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.link {
    color: #333;
}
</style>
