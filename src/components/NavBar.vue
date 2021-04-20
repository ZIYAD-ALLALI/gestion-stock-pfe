<template>
  <div dense>
    <v-toolbar
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Usine confection</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-import</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-factory</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text"
            >Usine Confection</v-list-item-title
          >
        </v-list-item>
        <br />
        <v-list-group
          active-class="black--text"
          prepend-icon="mdi-layers-triple"
        >
          <template v-slot:activator>
            <v-list-item-title>Notre Stock</v-list-item-title>
          </template>
          <v-list-item link to="/Tissus">
            <v-list-item-title>Nos Tissus</v-list-item-title> </v-list-item
          ><v-list-item link to="/Produits">
            <v-list-item-title>Nos Produits</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item link to="/Clients">
          <v-list-item-icon>
            <v-icon>mdi-account-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Nos Clients</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/Fournisseurs">
          <v-list-item-icon>
            <v-icon>mdi-account-arrow-left</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text"
            >Nos Fournisseurs</v-list-item-title
          >
        </v-list-item>

        <v-list-item link to="/CommandesClient">
          <v-list-item-icon>
            <v-icon>mdi-order-bool-ascending-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Commandes</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/FacturesClient">
          <v-list-item-icon>
            <v-icon>mdi-inbox-full-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Factures</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/Suivi">
          <v-list-item-icon>
            <v-icon>mdi-lan</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Suivi de Production</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
<style scoped></style>>
