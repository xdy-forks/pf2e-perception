# FoundryVTT PF2e Perception

### This module will add the ability to set conditional covers and visibility between tokens on a scene, it will also automates covers, light exposure, darkness and more

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K6M2V13)

Important Notes:

-   using the `Shared party vision` PF2e metagame setting will break the conditional visibilities for players.
-   the module doesn't add, modify or remove any data on the actors themselves, it only adds a very small amount of data on tokens. due to the temporary nature of tokens and with the module preventing its own data from being copied from one token to another, the module's footprint on your world is insignificant
-   to achieve everything that was needed, quite a lot of core foundry and pf2e system parts have been overridden, because of that, it may not play well with some other modules, especially any module that also modify the detection part of foundry (sight, hearring, ...), those will most likely see issues when paied with this module

Bullet points:

-   the GM can use a new icon (eye) in the token HUD to open the Perception menu for that token, in that menu, you can manually select the conditional covers and visibilities this token has against the other tokens in the scene

-   hovering over a token will display the conditional covers and visibilities other tokens in the scene have gainst this one

-   the module will hide tokens that are undetected from the currently selected tokens for the GM

-   the module will hide tokens that are undetected from any owned token in the scene for the players

-   the module allows players to target undetected tokens from the combat tracker

-   the module can automatically check if a token is in bright light, dim light or in darkness

-   the module can automatically check for standard covers (2 methods to test it are offered)

-   the module can automatically check for covers generated by other tokens, it only applies if there a minimum distance of 1 square between the attacker and the target

-   you can override conditional and automated covers in the attack modifiers window (the one that automatically appear on all attacks or when holding shift)

-   the module automatically applies covers modifiers on attacks

-   the module automatically applies the flat-footed modifier on attack when a token is hidden/undetected from another token

-   the module automatically roll a flat-check roll before an attack on a token that is concealed/hidden from the attacker and will cancel the attack when failed

-   the module handles attacking an undetected token by rolling a blind flat-check and attack roll

-   the module override the `Take Cover` system action, when used with targets, conditional covers will be applied instead of using the system effect

-   the module override the `Hide` system action to be able to apply conditional hidden, the module will automatically roll against the other token's perception DC ; you can target tokens to narrow down which should be affected

-   the module override the `Seek` system action, it will offer the ability to create a template that will automatically be used to target undetected/hidden token and roll against their stealth DC

-   the module add the `Point Out` action, which can be found with the other system actions `game.pf2e.actions.get('point-out')`, if you have a target when using it, the module will modify the target's conditional visibility against the allies of the actor that initiated the action

-   there is a lot of functions exposed in `game.modules.get('pf2e-perception')` that can be used, some even have a debug mode to display the computation like `getCreatureCover`, `hasStandardCover` or `inBrightLight`

-   the module handles darkness by using templates, some spells will see their templates automatically turned into darkness templates and you can create darkness templates yourself via the API

-   the module handles mist templates the same way it does for darkness ones

-   the module handle the `invisible` condition by forcing the `hidden` state on the token if not already

---

-   you can register you own `getWallCover` function if you need something different or more in depth

```js
game.modules.get('pf2e-perception').custom.getWallCover = (originToken, targetToken) =>
    undefined | 'none' | 'lesser' | 'standard' | 'greater' | 'greater-prone'
```

# Rule Element

take a look at the [wiki](https://github.com/reonZ/pf2e-perception/wiki#rule-element) to learn how the module's `Rule Element` works and also some already pre-designed feats, effects and macros to illustrate it

# CHANGELOG

You can see the changelog [HERE](./CHANGELOG.md)
