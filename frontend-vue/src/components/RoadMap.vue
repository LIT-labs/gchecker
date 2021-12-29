<template>
  <base-section>
    <v-container style="width: 50%">
      <base-heading
        title="Roadmap"
        align="center"
        color="black"
      />

      <base-subheading
        title="Aktuelle Version : Alpha 1.0"
        align="center"
        class="pb-16"
        color="black"
      />
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="item in roadmap"
          :key="item.name"
        >
          <span slot="opposite">{{ item.name }} </span>
          <v-card class="elevation-2">
            <v-card-title class="text-h5">
              {{ item.shortname }}
            </v-card-title>
            <v-card-text>
              <v-list-item
                v-for="feature in item.features"
                :key="feature"
              >
                <v-list-item-content>
                  <v-list-item-title> - {{ feature }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'RoadMap',
    data: () => ({
      roadmap: [
        {
          isCurrent: false,
          name: 'Release 1.1',
          shortname: 'r1.1',
          features: ['Offline Daten Speichern', 'Mehrere Nutzer', 'Rollen-Mangement'],
        },
        {
          isCurrent: false,
          name: 'Release 1.0',
          shortname: 'r1.0',
          features: ['QR-Code Scanner', 'Eincheck Links', 'Bezahlfunktion ab 3 Personen'],
        },
        {
          isCurrent: false,
          name: 'Beta 1.0',
          shortname: 'b1.0',
          features: ['Auto Deployment', 'Email-Notification bei Ablauf von Gültigkeit'],
        },
        {
          isCurrent: true,
          name: 'Alpha 1.0',
          shortname: 'a1.0',
          features: [
            'Individuellen g-checker erstellen',
            'User-Management',
            'Personen hinzufügen/enfernen/editieren',
            'Personen checken/erneut checken',
          ],
        },
      ],
    }),
  }
</script>
