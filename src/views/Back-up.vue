<template>
  <v-card>
    <v-card-title>
      <span>Nos Clients :</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <div class="container  justify-end">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="float-right d-flex"
            float
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Click Me
          </v-btn>
        </template>

        <v-card class="pa-5">
          <v-card-title class="headline grey lighten-2">
            Nouveau Client
          </v-card-title>

          <template>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-select
                v-model="select"
                :items="items"
                :rules="[(v) => !!v || 'Item is required']"
                label="Item"
                required
              ></v-select>

              <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Validate
              </v-btn>

              <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
              </v-btn>

              <v-btn color="warning" @click="resetValidation">
                Reset Validation
              </v-btn>
            </v-form>
          </template>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      :headers="headers"
      :items="clients"
      :items-per-page="5"
      :search="search"
      @click:row="dialog = !dialog"
      class="elevation-10 mx-16 my-16"
    ></v-data-table>
  </v-card>
</template>

<script>
import ClienDataService from "../services/ClientDataService";

export default {
  data() {
    return {
      search: "",
      dialog: "",
      headers: [
        {
          text: "CIN",
          align: "start",
          sortable: false,
          value: "cin",
        },
        { text: "Nom", value: "nom" },
        { text: "Prénom", value: "prenom" },
        { text: "Adresse", value: "adresse", sortable: false },
        { text: "Téléphone", value: "tele", sortable: false },
        { text: "Ville", value: "ville" },
      ],
      clients: [],

      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  mounted() {
    this.retrieveClients();
  },
  methods: {
    retrieveClients() {
      ClienDataService.getAll()
        .then((response) => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
