<template>
  <v-container class="pa-16">
    <v-row>
      <v-card class="pa-10 mb-10" width="100%">
          <h3>Commande pour :</h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <td><strong>Client</strong></td>
                <td><strong>Adresse</strong></td>
                <td><strong>Téléphone</strong></td>
                <td><strong>Ville</strong></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ligneCommande in lignesCommande"
                :key="ligneCommande.index"
              >
                <td>
                  <v-combobox
                    v-model="selectedClient"
                    :items="clients"
                    item-text="nomPrenom"
                    item-value="id"
                    label="Client"
                    return-object
                    outlined
                    dense
                  ></v-combobox>
                </td>
                <td>{{ selectedClient.adresse }}</td>
                <td>{{ selectedClient.tele }}</td>
                <td>{{ selectedClient.ville }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-row>
    <v-row>
      <v-card width="100%">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <td><strong>Produit</strong></td>
                <td><strong>Prix Unitaire</strong></td>
                <td><strong>Type</strong></td>
                <td><strong>Genre</strong></td>
                <td><strong>Quantité</strong></td>
                <td><strong>Total</strong></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ligneCommande in lignesCommande"
                :key="ligneCommande.index"
              >
                <td>
                  <v-combobox
                    v-model="selectedProduit"
                    :items="produits"
                    item-text="libelle"
                    item-value="id"
                    label="Produit"
                    return-object
                    outlined
                    dense
                  ></v-combobox>
                </td>
                <td>{{ selectedProduit.prix }}</td>
                <td>{{ selectedProduit.typeProduit }}</td>
                <td>{{ selectedProduit.genre }}</td>
                <td>
                  <v-text-field
                    class="w-50"
                    v-model="ligneCommande.quantite"
                    type="number"
                    :max="selectedProduit.qteDispo"
                    label="Quantité"
                  ></v-text-field>
                </td>
                <td>{{ totalLigne }}</td>
                <td>
                  <v-btn
                    v-on:click="removeElement(ligneCommande.index)"
                    class="danger"
                    >Remove</v-btn
                  >
                  <v-btn class="mx-2" fab dark color="indigo">
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-row>
    <div>
      <button class="button btn-primary" @click="addRow">Add row</button>
    </div>
  </v-container>
</template>

<script>
import ProduitDataService from "../services/ProduitDataService";
import ClientDataService from "../services/ClientDataService";
export default {
  data: () => ({
    lignesCommande: [{}],
    ligneCommande: {
      quantite: "",
      montant: "",
      produit: {
        id: "",
      },
    },
    ligneCommandeVide: {
      quantite: "",
      montant: "",
      produit: {
        id: "",
      },
    },
    totalLigne: "",
    produits: [],
    clients: [],
    selectedProduit: {},
    selectedClient: {},
  }),
  watch: {
    totalLigne: function() {
      return this.ligneCommande.quantite * this.selectedProduit.prix;
    },
  },
  methods: {
    addRow: function() {
      this.lignesCommande.push(this.ligneCommande);
      this.ligneCommande = Object.assign({}, this.ligneCommandeVide);
      document.createElement("tr");
    },
    removeElement: function(index) {
      this.rows.splice(index, 1);
    },
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
    retrieveClients() {
      ClientDataService.getAll()
        .then((response) => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveProduits();
    this.retrieveClients();
  },
};
</script>

<style scoped>
.Clients {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 15px;
  color: rgb(167, 167, 167);
  font-weight: 500;
}
button {
  margin: 20px;
}
.inputRow {
  display: none;
}
</style>
