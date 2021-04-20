<template>
  <v-card class="elevation-0">
    <v-data-table
      :headers="headers"
      :items="produits"
      :search="search"
      class="ma-10 elevation-10"
      ><v-snackbar v-model="snackbar" timeout="2000">
        Produit Ajouté !

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Nos Produits</v-toolbar-title>
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
                Nouveau Produit
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
                        <v-select
                          v-model="editedItem.genre"
                          :items="genres"
                          item-text="genre"
                          item-value="genre"
                          label="Genre"
                          single-line
                        ></v-select>
                        <v-select
                          v-model="editedItem.typeProduit"
                          :items="types"
                          item-text="type"
                          item-value="type"
                          label="Type Produit"
                          single-line
                        ></v-select>
                        <!-- <v-text-field
                          label="Genre"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field> -->
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.cout"
                          label="Coût"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.prix"
                          label="Prix"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.qteDispo"
                          label="Quantité Disponible"
                          :rules="[(v) => !!v || 'Ce champ est requis']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.qteStock"
                          label="Quantité Vendu"
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
        <v-btn color="primary" @click="retrieveTissus">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ProduitDataService from "../services/ProduitDataService";

export default {
  data: () => ({
    valid: false,
    snackbar: false,
    dialog: false,
    search: "",
    fullName: "a",
    dialogDelete: false,
    genres: [
      { genre: "HOMME" },
      { genre: "FEMME" },
      { genre: "FILLE" },
      { genre: "GARCON" },
      { genre: "BEBE" },
    ],
    types: [
      { type: "SWEAT" },
      { type: "PANTALON" },
      { type: "JEANS" },
      { type: "SURVETEMENT" },
      { type: "MANTEAU" },
      { type: "BLOUSON" },
      { type: "CHEMISE" },
      { type: "T_SHIRT" },
      { type: "SHORT" },
      { type: "GILET" },
      { type: "ROBE" },
      { type: "JUPE" },
    ],

    headers: [
      {
        text: "Libellé",
        align: "start",
        sortable: false,
        value: "libelle",
      },
      { text: "Genre", value: "genre" },
      { text: "Type", value: "typeProduit" },
      { text: "Cout", value: "cout" },
      { text: "Prix", value: "prix", sortable: false },
      { text: "Quantité Vendu", value: "qteStock", sortable: false },
      { text: "Quantité Disponible", value: "qteDispo" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    produits: [],
    editedIndex: -1,
    editedItem: {
      libelle: "",
      genre: "",
      cout: "",
      prix: "",
      qteDispo: "",
      qteStock: "",
      typeProduit: "",
    },
    defaultItem: {
      libelle: "",
      genre: "",
      cout: "",
      prix: "",
      qteDispo: "",
      qteStock: "",
      typeProduit: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau Produit" : "Modifier Produit";
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
    this.retrieveProduits();
  },

  methods: {
    retrieveProduits() {
      ProduitDataService.getAll()
        .then((response) => {
          this.produits = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editItem(item) {
      this.editedIndex = this.produits.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.produits.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      ProduitDataService.delete(this.produits[this.editedIndex].id);
      this.closeDelete();
      this.retrieveProduits();
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
          ProduitDataService.update(
            this.produits[this.editedIndex].id,
            this.editedItem
          );
        } else {
          ProduitDataService.create(this.editedItem);
        }
        this.retrieveProduits();
        this.retrieveProduits();
        this.close();
      }
    },
  },
};
</script>

<style></style>
