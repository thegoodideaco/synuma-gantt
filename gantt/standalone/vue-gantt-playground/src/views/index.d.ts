
  interface GanttDataObject {
    timelineName: string
    unitName: string
    currentMilestoneId: number
    openInfo: OpenInfo
    includeWeekends: boolean
    hasLandlordTurnoverDate: boolean
    phases: Phase[]
    displayTimelinePlannedDate: boolean
  }
  
  interface Phase {
    id: number
    order: number
    name: string
    startDate: string
    isCurrent: boolean
    milestones: Milestone[]
    color?: any
  }
  
  interface Milestone {
    id: number
    name: string
    plannedCompleteDate?: string | string
    estimatedCompleteDate?: string | string
    actualCompleteDate?: (null | string)[]
    startDate?: string | string
    plannedDurationInDays?: number | number
    actualDurationInDays?: (null | number)[]
    estimatedDurationInDays?: number | number
    tasks: Task[]
    isCurrent: boolean
    isComplete: boolean
    isEnabled: boolean
    order: number
    isOpenMilestone: boolean
  }
  
  interface Task {
    id: number
    name: string
    status: number
    statusName: string
    assignedToFirstName: string
    assignedToLastName: string
    parentTasks: (ParentTask | ParentTask)[]
    startDate?: string | string
    plannedCompleteDate?: string | string
    estimatedCompleteDate?: string | string
    actualCompleteDate?: (null | string)[]
    plannedDurationInDays: number
    actualDurationInDays?: (null | number)[]
    estimatedDurationInDays?: number | number
    isMilestoneStartTask: boolean
    isMilestoneCloseOut: boolean
    audits: any[]
    canReset: boolean
    isLandlordTurnover: boolean
    alwaysStartOnDayOfWeek?: any
    alwaysStartOnDayOfWeekDesc: string
    alwaysEndOnDayOfWeek?: number
    alwaysEndOnDayOfWeekDesc: string
    endWithEarliestParent: boolean
    holdEstimatedDate: boolean
  }
  
  interface ParentTask {
    order: number
    isActive: boolean
    childItems: any[]
    id: number
    name: string
  }
  
  interface OpenInfo {
    openDate: string
    operatingWeeks: number
  }
  
