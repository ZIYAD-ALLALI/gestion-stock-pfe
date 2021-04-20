<template>
  <v-card class="elevation-0">
    <v-data-table
      :headers="headers"
      :items="clients"
      :search="search"
      class="ma-10 elevation-10"
      ><v-snackbar v-model="snackbar" timeout="2000">
        Client Ajouté !

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Nos Clients</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog persistent v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouveau Client
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nomPrenom"
                          label="Nom et Prénom"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.ville"
                          label="Ville"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tele"
                          label="Téléphone"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.adresse"
                          label="Adresse"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="retrieveClients">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import ClienDataService from "../services/ClientDataService";
export default {
  data: () => ({
    valid: false,
    snackbar: false,
    dialog: false,
    search: "",
    fullName: "a",
    dialogDelete: false,
    headers: [
      {
        text: "Nom et Prénom",
        align: "start",
        sortable: false,
        value: "nomPrenom",
      },
      { text: "Adresse", value: "adresse", sortable: false },
      { text: "Téléphone", value: "tele", sortable: false },
      { text: "Ville", value: "ville" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    clients: [],
    editedIndex: -1,
    editedItem: {
      nomPrenom: "",
      adresse: "",
      tele: "",
      ville: "",
    },
    defaultItem: {
      nomPrenom: "",
      adresse: "",
      tele: "",
      ville: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau Client" : "Modifier Client";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
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
    editItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      ClienDataService.delete(this.clients[this.editedIndex].id);
      this.closeDelete();
      this.retrieveClients();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.valid == true) {
        if (this.editedIndex > -1) {
          ClienDataService.update(
            this.clients[this.editedIndex].id,
            this.editedItem
          );
        } else {
          ClienDataService.create(this.editedItem);
        }
        this.retrieveClients();
        this.retrieveClients();
        this.close();
        this.snackbar = true;
        this.snackbar = true;
      }
    },
  },
};
</script>
<style></style>
