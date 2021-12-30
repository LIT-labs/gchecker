<template>
  <div>
    <v-sheet color="primary">
      <base-heading
        size="text-h2"
        style="padding-top: 60px"
        title="Einfaches dokumentieren von 3G"
        align="center"
      />
      <base-subheading
        size="text-h4"
        title="Die schnellste Art 3G zu checken und zu protokolieren "
        align="center"
      />

      <v-row
        justify="center"
        class="py-16"
      >
        <v-card-actions>
          <v-btn
            x-large
            color="accent"
            to="/new"
          >
            Neuen gchecker erstellen
          </v-btn>
          <v-btn
            v-if="loggedIn"
            x-large
            color="accent2"
            @click="toDashboard"
          >
            zu bestehenden wechseln
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-sheet>

    <feature-list />

    <road-map />
  </div>
</template>

<script>
  import FeatureList from '../../components/FeatureList.vue'
  import RoadMap from '../../components/RoadMap.vue'

  export default {
    name: 'Index',
    components: { FeatureList, RoadMap },
    computed: {
      auth () {
        return this.$store.state.auth
      },
      loggedIn () {
        return this.$store.state.auth.status.loggedIn
      },
    },

    methods: {
      toDashboard () {
        this.$router.push({
          name: 'dashboard',
          params: {
            bubbleName: this.$store.state.auth.user.bubbleName,
            slug: this.$store.state.auth.user.slug,
          },
        })
      },
    },
  }
</script>
