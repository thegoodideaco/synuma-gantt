<template>
  <div class="pt-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="form-check">
            <input id="plannedTimelines"
                   class="form-check-input"
                   type="checkbox"
                   value="">
            <label class="form-check-label"
                   for="plannedTimelines">
              Show planned timelines
            </label>
          </div>
        </div>
      </div>
      <div class="metadata border-right">
        <div class="col-headers">
          <!-- TBD figure this shit out -->
        </div>
        <div class="row mt-4">
          <div class="col-3">
            <div class="gantt-label in-progress">
              In Progress
            </div>
          </div>
          <div class="col phase">
            <i class="fas fa-angle-down mr-2" />
            Real Estate
            <div class="row milestone align-items-center">
              <div class="col">
                <i class="fas fa-check-circle mr-2 text-green" />Submit LOI
              </div>
              <div class="col task-list">
                3 of 3 tasks complete
              </div>
              <div class="col assigned-to">
                Justin Davis
              </div>
            </div>
            <div class="row milestone align-items-center">
              <div class="col">
                <i class="fas fa-check-circle mr-2 text-light" />Submit LOI
              </div>
              <div class="col task-list">
                3 of 3 tasks complete
              </div>
              <div class="col assigned-to">
                Justin Davis
              </div>
            </div>
            <div class="row milestone align-items-center">
              <div class="col">
                <i class="fas fa-check-circle mr-2 text-light" />Submit LOI
              </div>
              <div class="col task-list">
                3 of 3 tasks complete
              </div>
              <div class="col assigned-to">
                Justin Davis
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4 align-items-center">
          <div class="col-3">
            <div class="gantt-label not-started">
              Not Started
            </div>
          </div>
          <div class="col phase">
            <i class="fas fa-angle-right mr-2" />
            Real Estate
          </div>
        </div>
      </div> <!-- end .metadata -->
      <div class="date-grid">
        <div class="row">
          <span>1</span>
          <span>2</span>
        </div>
      </div>
    </div>
  </div>
</template>
