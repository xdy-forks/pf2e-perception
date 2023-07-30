import { setupActions } from './action.js'
import { getRollContext, visionLevel } from './actor.js'
import { API } from './api.js'
import { renderChatMessage } from './chat.js'
import { checkRoll, renderCheckModifiersDialog } from './check.js'
import { renderCombatTracker, renderCombatTrackerConfig } from './combat.js'
import { basicSightCanDetect, detectionModeTestVisibility, feelTremorCanDetect, hearingCanDetect } from './detection.js'
import { MODULE_ID } from './module.js'
import { renderSceneConfig } from './scene.js'
import { registerSettings } from './settings.js'
import { highlightTemplateGrid, onMeasuredTemplate, preCreateMeasuredTemplate } from './template.js'
import {
    clearConditionals,
    controlToken,
    deleteToken,
    hoverToken,
    pasteToken,
    preCreateToken,
    renderTokenHUD,
    rulesBasedVision,
    updateToken,
} from './token.js'

const CHECK_ROLL = 'game.pf2e.Check.roll'

const RULES_BASED_VISION = 'CONFIG.Token.documentClass.prototype.rulesBasedVision'

const HIGHLIGHT_TEMPLATE_GRID = 'CONFIG.MeasuredTemplate.objectClass.prototype.highlightGrid'

const GET_ROLL_CONTEXT = 'CONFIG.Actor.documentClass.prototype.getRollContext'
const VISION_LEVEL = 'CONFIG.PF2E.Actor.documentClasses.npc.prototype.visionLevel'

const DETECTION_MODE_TEST_VISIBILITY = 'DetectionMode.prototype.testVisibility'
const BASIC_SIGHT_CAN_DETECT = 'CONFIG.Canvas.detectionModes.basicSight._canDetect'
const HEARING_CAN_DETECT = 'CONFIG.Canvas.detectionModes.hearing._canDetect'
const FEEL_TREMOR_CAN_DETECT = 'CONFIG.Canvas.detectionModes.feelTremor._canDetect'

Hooks.once('init', () => {
    registerSettings()
    setupActions()

    libWrapper.register(MODULE_ID, CHECK_ROLL, checkRoll)

    libWrapper.register(MODULE_ID, HIGHLIGHT_TEMPLATE_GRID, highlightTemplateGrid, 'OVERRIDE')

    libWrapper.register(MODULE_ID, RULES_BASED_VISION, rulesBasedVision, 'OVERRIDE')

    libWrapper.register(MODULE_ID, GET_ROLL_CONTEXT, getRollContext, 'OVERRIDE')
    libWrapper.register(MODULE_ID, VISION_LEVEL, visionLevel, 'OVERRIDE')

    libWrapper.register(MODULE_ID, DETECTION_MODE_TEST_VISIBILITY, detectionModeTestVisibility, 'OVERRIDE')
    libWrapper.register(MODULE_ID, BASIC_SIGHT_CAN_DETECT, basicSightCanDetect, 'OVERRIDE')
    libWrapper.register(MODULE_ID, HEARING_CAN_DETECT, hearingCanDetect, 'OVERRIDE')
    libWrapper.register(MODULE_ID, FEEL_TREMOR_CAN_DETECT, feelTremorCanDetect, 'OVERRIDE')

    const isGM = game.data.users.find(x => x._id === game.data.userId).role >= CONST.USER_ROLES.GAMEMASTER
    if (isGM) {
        Hooks.on('renderSceneConfig', renderSceneConfig)
        Hooks.on('renderCombatTrackerConfig', renderCombatTrackerConfig)
    } else {
        Hooks.on('renderCombatTracker', renderCombatTracker)
    }
})

Hooks.once('ready', () => {
    game.modules.get(MODULE_ID).api = API

    Hooks.on('renderChatMessage', renderChatMessage)

    for (const el of document.querySelectorAll('#chat-log .chat-message')) {
        const message = game.messages.get(el.dataset.messageId)
        if (!message) continue
        renderChatMessage(message, $(el))
    }

    if (game.user.isGM && game.modules.get('pf2e-rules-based-npc-vision')?.active) {
        ui.notifications.error(`${MODULE_ID}.warning.npc-vision`, { permanent: true, localize: true })
    }
})

Hooks.on('hoverToken', hoverToken)
Hooks.on('pasteToken', pasteToken)
Hooks.on('updateToken', updateToken)
Hooks.on('deleteToken', deleteToken)
Hooks.on('controlToken', controlToken)
Hooks.on('renderTokenHUD', renderTokenHUD)
Hooks.on('preCreateToken', preCreateToken)

Hooks.on('canvasPan', () => clearConditionals())

Hooks.on('renderCheckModifiersDialog', renderCheckModifiersDialog)

Hooks.on('preCreateMeasuredTemplate', preCreateMeasuredTemplate)
Hooks.on('createMeasuredTemplate', onMeasuredTemplate)
Hooks.on('updateMeasuredTemplate', onMeasuredTemplate)
Hooks.on('deleteMeasuredTemplate', onMeasuredTemplate)
