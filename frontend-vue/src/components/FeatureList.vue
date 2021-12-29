<template>
  <base-section>
    <base-heading
      color="black"
      title="Funktionen"
      align="center"
      class="pb-16"
    />
    <v-row
      v-for="(item, index) in features"
      :key="item.header"
      class="pa-6"
      no-gutters
    >
      <v-col
        cols="12"
        sm="3"
      />

      <v-col
        v-if="index % 2 === 0"
        cols="12"
        sm="3"
      >
        <base-heading color="black">
          {{ item.header }}
        </base-heading>
        <base-subheading color="black">
          {{ item.subheader }}
        </base-subheading>
      </v-col>
      <v-col
        v-if="index % 2 === 0"
        cols="12"
        sm="3"
      >
        <base-icon
          class="d-flex justify-center"
          size="150"
          :color="item.iconColor"
        >
          {{ item.icon }}
        </base-icon>
      </v-col>

      <v-col
        v-if="index % 2 !== 0"
        cols="12"
        sm="3"
      >
        <base-icon
          class="d-flex justify-center"
          size="150"
          :color="item.iconColor"
        >
          {{ item.icon }}
        </base-icon>
      </v-col>
      <v-col
        v-if="index % 2 !== 0"
        cols="12"
        sm="3"
      >
        <base-heading color="black">
          {{ item.header }}
        </base-heading>
        <base-subheading color="black">
          {{ item.subheader }}
        </base-subheading>
      </v-col>
      <v-col
        cols="12"
        sm="3"
      />
    </v-row>
  </base-section>
</template>

<script>
  export default {
    name: 'FeatureList',
    data: () => ({
      features: [
        {
          header: 'Kein Papierkram mehr!',
          subheader: 'Alles digital, immer verfügbar.',
          icon: 'mdi-tree',
          iconColor: 'green',
        },
        {
          header: 'Von überall zugreifen!',
          subheader: 'Funktioniert auf allen Plattformen.',
          icon: 'mdi-earth',
          iconColor: 'blue',
        },
        {
          header: ' Einfaches 3G-Prüfen.',
          subheader: 'Minmal-Design-Prinzip. Konzentration auf das Wesentliche',
          icon: ' mdi-clipboard-check-multiple-outline',
          iconColor: 'primary',
        },
        {
          header: 'Teilbare Links!',
          subheader: 'Erspare dir Arbeit und teile Links zum Status-Einchecken mit allen',
          icon: 'mdi-share-variant-outline',
          iconColor: 'secondary',
        },
        {
          header: 'Umsonst',
          subheader: 'Bis zu 10 Personen vollständig umsonst managen.',
          icon: 'mdi-currency-eur-off',
          iconColor: 'yellow lighten-3',
        },
      ],
    }),
  }
</script>
