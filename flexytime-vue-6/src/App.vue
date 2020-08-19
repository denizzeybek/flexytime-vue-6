<template>
  <div id="app">

    <div class="container mt-5">
      <div class="row d-flex justify-content-start content-row">
        <div class="col-md-4 text-dark blue-border-bottom">
          <h4>Görevler</h4>
        </div>
        <div class="col-md-4 text-dark blue-border-bottom">
          <h4>Zaman Çizelgesi</h4>
        </div>
        <div class="col-md-4 text-dark blue-border-bottom">
          <h4>Aktiviteler</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 columns">
          <!-- görevler col u -->
          <div class="row line-vertical example-1 scrollbar-ripe-malinka">
            <div class="col-md-12">
              <app-tasks></app-tasks>
            </div>
          </div>
        </div>
        <div class="col-md-4 columns">
          <!-- zaman çizelgesi col u -->
          <div class="row line-vertical example-1 scrollbar-ripe-malinka">
            <div class="col-md-12">
              <app-timeline ></app-timeline>
            </div>
          </div>
        </div>
        <div class="col-md-4 columns ">
          <!-- aktiviteler col u -->
          <div class="row line-vertical example-1 scrollbar-ripe-malinka ">
            <div class="col-md-12">
              <app-activities ></app-activities>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
import timeline from "./components/timeline";
import activities from "./components/activities";
import tasks from "./components/tasks";
export default {
  name: 'app',
  components : {
    appTimeline: timeline,
    appActivities: activities,
    appTasks: tasks
  },
  data(){
    return{ 
      isEmpty :null,
    }
  }
}
</script>

<style scoped src="../src/assets/css/multiple.css">

</style>
