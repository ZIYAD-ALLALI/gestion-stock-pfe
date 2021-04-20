<template>
  <v-card class="elevation-0">
    <v-data-table
      :headers="headers"
      :items="tissus"
      :search="search"
      class="ma-10 elevation-10"
      ><v-snackbar v-model="snackbar" timeout="2000">
        Tissu Ajouté !

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Nos Tissus</v-toolbar-title>
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
                Nouveau Tissu
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
                          v-model="editedItem.libelle"
                          label="Libellé"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.prixU"
                          label="Prix Unitaire"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.qteDispo"
                          label="Quantité"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                          required
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                              v-model="editedItem.dateAchat"
                              label="Date d'achat"
                              prepend-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                              autocomplete="off"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.dateAchat"
                            @input="menu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12">
                        <template>
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12">
                                <v-combobox
                                  :rules="[(v) => !!v || 'Ce champ est requis']"
                                  required
                                  v-model="editedItem.fournisseur"
                                  :items="fournisseurs"
                                  item-text="nomPrenom"
                                  item-value="id"
                                  label="Fournisseur"
                                  return-object
                                  outlined
                                  dense
                                ></v-combobox>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>
                      </v-col>

                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.qteStock"
                          label="Quantité en Stock"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col> -->
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
        <v-btn color="primary" @click="retrieveTissus">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import TissuDataService from "../services/TissuDataService";
import FournisseurDataService from "../services/FournisseurDataService";

export default {
  data: () => ({
    menu: false,
    valid: false,
    snackbar: false,
    dialog: false,
    search: "",
    dialogDelete: false,
    genres: [{ genre: "Homme" }, { genre: "Femme" }],
    headers: [
      {
        text: "Libellé",
        align: "start",
        sortable: false,
        value: "libelle",
      },
      { text: "Prix Unitaire", value: "prixU" },
      { text: "Quantité", value: "qteDispo", sortable: false },
      { text: "Date Achat", value: "dateAchat", sortable: false },
      { text: "Fournisseur", value: "fournisseur.nomPrenom" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tissus: [],
    fournisseurs: [],
    editedIndex: -1,
    editedItem: {
      libelle: "",
      prixU: "",
      qteDispo: "",
      dateAchat: "",
      fournisseur:"",
    },
    defaultItem: {
      libelle: "",
      prixU: "",
      qteDispo: "",
      dateAchat: "",
      fournisseur: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau Tissu" : "Modifier Tissu";
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
    this.retrieveTissus();
    this.retrieveFournisseurs();
  },

  methods: {
    retrieveTissus() {
      TissuDataService.getAll()
        .then((response) => {
          this.tissus = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveFournisseurs() {
      FournisseurDataService.getAll()
        .then((response) => {
          this.fournisseurs = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editItem(item) {
      this.editedIndex = this.tissus.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.tissus.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      TissuDataService.delete(this.tissus[this.editedIndex].id);
      this.closeDelete();
      this.retrieveTissus();
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
          TissuDataService.update(
            this.tissus[this.editedIndex].id,
            this.editedItem
          );
        } else {
          TissuDataService.create(this.editedItem);
        }
        this.retrieveTissus();
        this.retrieveTissus();
        this.close();
        this.snackbar = true;
        this.snackbar = true;
      }
    },
  },
};
</script>

<style></style>
