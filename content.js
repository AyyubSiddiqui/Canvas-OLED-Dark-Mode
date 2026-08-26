// Canvas OLED Dark Mode — Chrome extension content script
// Author: Ayyub Siddiqui
// Version: 1.0.0
//
// Runs in the page's MAIN world (see manifest.json) so the
// attachShadow hook below actually reaches Canvas's own code.

(() => {
    'use strict';

    const C = {
        black: '#000000',

        surface1: '#000000',
        surface2: '#000000',
        surface3: '#000000',
        surface4: '#000000',

        text: '#ffffff',
        text2: '#e0e0e0',
        muted: '#aaaaaa',

        border: '#383838',
        link: '#69b7ff'
    };

    // Every inline write goes through here so the mutation
    // observer can tell our own writes apart from the site's.

    const ownStyles =
        new WeakMap();


    function setStyle(el, prop, value) {
        el.style.setProperty(
            prop,
            value,
            'important'
        );


        ownStyles.set(
            el,
            el.getAttribute('style')
        );
    }

    function blackRoot() {
        const html = document.documentElement;

        if (html) {
            setStyle(
                html,
                'background-color',
                C.black
            );

            setStyle(
                html,
                'color-scheme',
                'dark'
            );
        }

        if (document.body) {
            setStyle(
                document.body,
                'background-color',
                C.black
            );

            setStyle(
                document.body,
                'color-scheme',
                'dark'
            );
        }
    }


    blackRoot();

    const EARLY_CSS = `

        :root,
        html,
        body {
            background-color: #000 !important;
            color-scheme: dark !important;
        }


        input,
        textarea,
        select,
        button {
            color-scheme: dark !important;
        }


        input::placeholder,
        textarea::placeholder {
            color: ${C.muted} !important;
            opacity: 1 !important;
        }


        * {
            text-shadow: none !important;
            scrollbar-color: #444 #000;
        }


        ::-webkit-scrollbar {
            width: 11px;
            height: 11px;
        }


        ::-webkit-scrollbar-track {
            background: #000;
        }


        ::-webkit-scrollbar-corner {
            background: #000;
        }


        ::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 6px;
        }


        ::selection {
            background: #555;
            color: #fff;
        }


        // CANVAS COLOR VARIABLES

        html {
            --ic-brand-global-nav-menu-item__hover-background: #000 !important;
            --ic-brand-global-nav-bgd: #000 !important;
        }

        .ic-app-header,
        .ic-app-header__main-navigation,
        .ic-app-header__menu-list,
        .ic-app-header__menu-list-item,
        .ic-app-header__menu-list-link,

        .ic-app-header__menu-list-link:hover,
        .ic-app-header__menu-list-link:focus,
        .ic-app-header__menu-list-link:focus-visible,
        .ic-app-header__menu-list-link:active,

        .ic-app-header__menu-list-link--active,
        .ic-app-header__menu-list-link.ic-app-header__menu-list-link--active,

        .ic-app-header a,
        .ic-app-header a:hover,
        .ic-app-header a:focus,
        .ic-app-header a:focus-visible,
        .ic-app-header a:active,

        .ic-app-header button,
        .ic-app-header button:hover,
        .ic-app-header button:focus,
        .ic-app-header button:focus-visible,
        .ic-app-header button:active,

        #header,
        #menu,
        #primaryNav,
        #primaryNav > *,
        #primaryNav > *:hover,
        #primaryNav > *:focus,
        #primaryNav > *:focus-within,
        #primaryNav > *:active {
            background: #000 !important;
            background-color: #000 !important;
            box-shadow: none !important;
        }

        .ic-app-header__menu-list-item *,
        .ic-app-header__menu-list-link *,
        .ic-app-header__menu-list-link:hover *,
        .ic-app-header__menu-list-link:focus *,
        .ic-app-header__menu-list-link:focus-visible *,
        .ic-app-header__menu-list-link:active * {
            background-color: transparent !important;
            box-shadow: none !important;
        }


        .ic-app-header svg,
        .ic-app-header svg *,
        .ic-app-header i,
        .ic-app-header [class*="Icon"],
        .ic-app-header [class*="icon"] {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
        }


        .ic-app-header__menu-list-link,
        .ic-app-header__menu-list-link:hover,
        .ic-app-header__menu-list-link:focus,
        .ic-app-header__menu-list-link:focus-visible,
        .ic-app-header__menu-list-link:active {
            outline: none !important;
            border-color: transparent !important;
        }

        .ic-app-course-menu,
        .ic-app-course-menu ul,
        .ic-app-course-menu li,
        .ic-app-course-menu li:hover,
        .ic-app-course-menu li:focus,
        .ic-app-course-menu li:focus-within,
        .ic-app-course-menu li:active,

        .ic-app-course-menu a,
        .ic-app-course-menu a:hover,
        .ic-app-course-menu a:focus,
        .ic-app-course-menu a:active,

        .ic-app-course-menu__list-item,
        .ic-app-course-menu__list-item:hover,
        .ic-app-course-menu__list-item:focus-within {
            background-color: #000 !important;
        }

        .ig-list,
        .ig-row,
        .ig-row:hover,
        .ig-row:focus,
        .ig-row:focus-within,
        .ig-row:active,

        .context_module,
        .context_module:hover,
        .context_module:focus-within,

        .context_module_item,
        .context_module_item:hover,
        .context_module_item:focus-within,

        .module-item,
        .module-item:hover,
        .module-item:focus-within,

        .item-group-container,
        .item-group-container:hover,
        .item-group-container:focus-within {
            background-color: #000 !important;
        }

        .collectionViewItems,
        .collectionViewItems > *,
        .collectionViewItems > *:hover,
        .collectionViewItems > *:focus,
        .collectionViewItems > *:focus-within,

        .rosterUser,
        .rosterUser:hover,
        .rosterUser:focus-within,

        .discussion-row,
        .discussion-row:hover,
        .discussion-row:focus-within,

        .assignment,
        .assignment:hover,
        .assignment:focus-within {
            background-color: #000 !important;
        }

        table,
        tbody,
        thead,
        tfoot,

        tr,
        tr:hover,

        td,
        td:hover,

        th,
        th:hover {
            background-color: #000 !important;
        }

        .content,
        .content-box,
        .content-box-mini,
        .module-sequence-footer,
        .header-bar,
        .item-group-container,
        .student-assignment-overview,
        .assignment-student-header,
        .submission-details-header,
        .comments,
        .comment,
        .discussion-section,
        .discussion-entry-reply-area {
            background-color: #000 !important;
        }

        [style*="background-color: rgb(11, 11, 11)"],
        [style*="background-color: rgb(17, 17, 17)"],
        [style*="background-color: rgb(24, 24, 24)"],
        [style*="background-color: rgb(32, 32, 32)"],

        [style*="background-color: #0b0b0b"],
        [style*="background-color: #111111"],
        [style*="background-color: #181818"],
        [style*="background-color: #202020"] {
            background-color: #000 !important;
        }

        html,
        body,
        #application,
        #wrapper,
        #main,
        #content,
        #content-wrapper,
        #not_right_side,
        #right-side,
        #right-side-wrapper,
        footer,
        #footer,
        .footer,
        .ic-app-footer,
        .ic-app-footer__container,
        .ic-app-footer__links,
        .ic-Layout-wrapper,
        .ic-Layout-columns,
        .ic-Layout-contentWrapper,
        .ic-Layout-contentMain,
        .ic-app-main-content,
        .ic-app-main-content__primary,
        .ic-app-main-content__secondary,
        .module-sequence-footer,
        .module-sequence-footer-content {
            background: #000 !important;
            background-color: #000 !important;
        }

        .ic-app-header .ic-app-header__logomark-container a.ic-app-header__logomark,
        .ic-app-header .ic-app-header__logomark-container a.ic-app-header__logomark:hover,
        .ic-app-header .ic-app-header__logomark-container a.ic-app-header__logomark:focus,
        .ic-app-header .ic-app-header__logomark-container a.ic-app-header__logomark:focus-visible,
        .ic-app-header .ic-app-header__logomark-container a.ic-app-header__logomark:active {
            background: var(--ic-brand-header-image) center / contain no-repeat transparent !important;
        }


        .ic-app-header .ic-app-header__logomark-container {
            background-color: var(--ic-brand-global-nav-logo-bgd, #000) !important;
        }

        .ig-row,
        .context_module_item,
        .module-item,
        .discussion-row,
        .assignment,
        table,
        tr,
        td,
        th {
            border-color: ${C.border} !important;
        }

    `;

    function installCSS(root = document) {
        try {
            if (
                root.querySelector &&
                root.querySelector(
                    '#canvas-oled-dark-style'
                )
            ) {
                return;
            }


            const doc =
                root.ownerDocument ||
                document;


            const style =
                doc.createElement('style');


            style.id =
                'canvas-oled-dark-style';


            style.textContent =
                EARLY_CSS;


            if (root === document) {
                (
                    document.head ||
                    document.documentElement
                ).appendChild(style);
            }

            else {
                root.prepend(style);
            }
        }

        catch (_) {}
    }


    installCSS();

    function parseColor(value) {
        if (!value) {
            return null;
        }


        value =
            value.trim().toLowerCase();


        if (
            value === 'transparent' ||
            value === 'none'
        ) {
            return null;
        }


        const rgb =
            value.match(
                /^rgba?\(\s*([\d.]+)(?:\s*,\s*|\s+)([\d.]+)(?:\s*,\s*|\s+)([\d.]+)(?:\s*(?:,|\/)\s*([\d.]+%?))?\s*\)$/i
            );


        if (rgb) {
            let alpha = 1;


            if (
                rgb[4] !== undefined
            ) {
                if (
                    rgb[4].endsWith('%')
                ) {
                    alpha =
                        parseFloat(
                            rgb[4]
                        ) / 100;
                }

                else {
                    alpha =
                        parseFloat(
                            rgb[4]
                        );
                }
            }


            return {
                r: Number(rgb[1]),
                g: Number(rgb[2]),
                b: Number(rgb[3]),
                a: alpha
            };
        }


        const hex =
            value.match(
                /^#([0-9a-f]{3,8})$/i
            );


        if (!hex) {
            return null;
        }


        let h =
            hex[1];


        if (h.length === 3) {
            h =
                h[0] + h[0] +
                h[1] + h[1] +
                h[2] + h[2];
        }


        if (h.length === 4) {
            h =
                h[0] + h[0] +
                h[1] + h[1] +
                h[2] + h[2] +
                h[3] + h[3];
        }


        if (
            h.length !== 6 &&
            h.length !== 8
        ) {
            return null;
        }


        return {
            r:
                parseInt(
                    h.slice(0, 2),
                    16
                ),

            g:
                parseInt(
                    h.slice(2, 4),
                    16
                ),

            b:
                parseInt(
                    h.slice(4, 6),
                    16
                ),

            a:
                h.length === 8
                    ? parseInt(
                        h.slice(6, 8),
                        16
                    ) / 255
                    : 1
        };
    }

    function brightness(c) {
        return (
            c.r * 0.299 +
            c.g * 0.587 +
            c.b * 0.114
        );
    }


    function saturation(c) {
        const max =
            Math.max(
                c.r,
                c.g,
                c.b
            );


        const min =
            Math.min(
                c.r,
                c.g,
                c.b
            );


        if (max === 0) {
            return 0;
        }


        return (
            (max - min) /
            max
        );
    }


    function isNeutral(c) {
        return (
            c &&
            saturation(c) < 0.22
        );
    }


    function linearChannel(value) {
        value /= 255;


        if (
            value <= 0.04045
        ) {
            return (
                value / 12.92
            );
        }


        return Math.pow(
            (
                value + 0.055
            ) / 1.055,
            2.4
        );
    }


    function luminance(c) {
        return (
            0.2126 *
                linearChannel(c.r) +

            0.7152 *
                linearChannel(c.g) +

            0.0722 *
                linearChannel(c.b)
        );
    }


    function contrastRatio(a, b) {
        const x =
            luminance(a);


        const y =
            luminance(b);


        return (
            (
                Math.max(x, y) +
                0.05
            ) /
            (
                Math.min(x, y) +
                0.05
            )
        );
    }

    // Exclusions

    function ignored(el) {
        const tag =
            el.tagName;


        if (
            el.classList &&
            (
                el.classList.contains(
                    'ic-app-header__logomark'
                ) ||
                el.classList.contains(
                    'ic-app-header__logomark-container'
                )
            )
        ) {
            return true;
        }


        return (
            tag === 'SCRIPT' ||
            tag === 'STYLE' ||
            tag === 'LINK' ||
            tag === 'META' ||
            tag === 'NOSCRIPT' ||
            tag === 'SOURCE' ||
            tag === 'IMG' ||
            tag === 'VIDEO' ||
            tag === 'PICTURE' ||
            tag === 'CANVAS'
        );
    }

    function lightNeutralGradient(image) {
        if (
            !image ||
            !image.includes('gradient')
        ) {
            return false;
        }


        const stops =
            image.match(
                /rgba?\([^)]*\)/g
            ) || [];


        for (
            const stop
            of stops
        ) {
            const c =
                parseColor(stop);


            if (
                c &&
                c.a >= 0.05 &&
                isNeutral(c) &&
                brightness(c) >= 135
            ) {
                return true;
            }
        }


        return false;
    }


    function convertBackground(
        el,
        style
    ) {
        if (
            lightNeutralGradient(
                style.backgroundImage
            )
        ) {
            setStyle(
                el,
                'background-image',
                'none'
            );
        }


        const bg =
            parseColor(
                style.backgroundColor
            );


        if (
            !bg ||
            bg.a < 0.05 ||
            !isNeutral(bg)
        ) {
            return;
        }


        if (
            brightness(bg) >= 135
        ) {
            setStyle(
                el,
                'background-color',
                C.black
            );
        }
    }

    function effectiveBackground(el) {
        let node = el;


        while (
            node &&
            node instanceof Element
        ) {
            try {
                const style =
                    getComputedStyle(node);


                const bg =
                    parseColor(
                        style.backgroundColor
                    );


                if (
                    bg &&
                    bg.a >= 0.05
                ) {
                    return bg;
                }
            }

            catch (_) {}


            node =
                node.parentElement;
        }


        return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };
    }

    // Text

    function convertText(
        el,
        style
    ) {
        const fg =
            parseColor(
                style.color
            );


        if (!fg) {
            return;
        }


        let bg =
            effectiveBackground(el);


        if (
            brightness(bg) > 115
        ) {
            if (!isNeutral(bg)) {
                return;
            }


            bg = {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            };
        }


        const b =
            brightness(fg);


        const s =
            saturation(fg);


        if (s < 0.30) {
            if (b < 215) {
                setStyle(
                    el,
                    'color',
                    C.text
                );
            }


            return;
        }


        if (
            contrastRatio(fg, bg) < 3.25
        ) {
            setStyle(
                el,
                'color',
                C.link
            );
        }
    }

    function convertBorders(
        el,
        style
    ) {
        const sides = [
            'Top',
            'Right',
            'Bottom',
            'Left'
        ];


        for (
            const side
            of sides
        ) {
            const color =
                parseColor(
                    style[
                        `border${side}Color`
                    ]
                );


            if (
                !color ||
                !isNeutral(color)
            ) {
                continue;
            }


            if (
                brightness(color) <
                110
            ) {
                continue;
            }


            setStyle(
                el,
                `border-${side.toLowerCase()}-color`,
                C.border
            );
        }
    }

    function convertForm(el) {
        if (
            !(
                el instanceof
                    HTMLInputElement ||

                el instanceof
                    HTMLTextAreaElement ||

                el instanceof
                    HTMLSelectElement
            )
        ) {
            return;
        }


        const type =
            (
                el.getAttribute(
                    'type'
                ) ||
                ''
            ).toLowerCase();


        if (
            type === 'checkbox' ||
            type === 'radio'
        ) {
            return;
        }


        setStyle(
            el,
            'background-color',
            C.black
        );


        setStyle(
            el,
            'color',
            C.text
        );


        setStyle(
            el,
            'border-color',
            '#555'
        );
    }

    function convertSVG(el) {
        const tag =
            el.tagName.toLowerCase();


        if (
            tag !== 'text' &&
            tag !== 'tspan'
        ) {
            return;
        }


        try {
            const style =
                getComputedStyle(el);


            const fill =
                parseColor(
                    style.fill
                );


            if (
                fill &&
                isNeutral(fill) &&
                brightness(fill) < 215
            ) {
                setStyle(
                    el,
                    'fill',
                    C.text
                );
            }
        }

        catch (_) {}
    }

    function processElement(el) {
        if (
            !(el instanceof Element) ||
            ignored(el)
        ) {
            return;
        }


        if (
            el instanceof
                SVGElement
        ) {
            convertSVG(el);
            return;
        }


        let style;


        try {
            style =
                getComputedStyle(el);
        }

        catch (_) {
            return;
        }


        convertBackground(
            el,
            style
        );


        try {
            style =
                getComputedStyle(el);
        }

        catch (_) {
            return;
        }


        convertText(
            el,
            style
        );


        convertBorders(
            el,
            style
        );


        convertForm(el);
    }

    function processTree(root) {
        if (
            !(root instanceof Element)
        ) {
            return;
        }


        processElement(root);


        const elements =
            root.querySelectorAll('*');


        for (
            const el
            of elements
        ) {
            processElement(el);
        }
    }

    let initialPassComplete =
        false;


    function initialPass() {
        if (initialPassComplete) {
            return;
        }


        if (!document.body) {
            return;
        }


        initialPassComplete =
            true;


        blackRoot();


        processTree(
            document.body
        );
    }


    let rescanTimer =
        null;


    function fullRescan() {
        rescanTimer = null;


        if (!document.body) {
            return;
        }


        blackRoot();


        processTree(
            document.body
        );
    }


    function scheduleRescan(delay = 60) {
        if (rescanTimer) {
            clearTimeout(rescanTimer);
        }


        rescanTimer =
            setTimeout(
                fullRescan,
                delay
            );
    }

    function immediateBackgroundCheck(el) {
        if (
            !(el instanceof Element) ||
            ignored(el)
        ) {
            return;
        }


        if (
            el instanceof
                SVGElement
        ) {
            return;
        }


        try {
            const style =
                getComputedStyle(el);


            const bg =
                parseColor(
                    style.backgroundColor
                );


            if (
                !bg ||
                bg.a < 0.05 ||
                !isNeutral(bg)
            ) {
                return;
            }


            if (
                brightness(bg) >=
                135
            ) {
                setStyle(
                    el,
                    'background-color',
                    C.black
                );
            }
        }

        catch (_) {}
    }

    const pending =
        new Set();


    let scheduled =
        false;


    function queue(node) {
        if (
            !(node instanceof Element)
        ) {
            return;
        }


        pending.add(node);


        if (scheduled) {
            return;
        }


        scheduled = true;


        requestAnimationFrame(
            flush
        );
    }


    function flush() {
        scheduled = false;


        const nodes =
            Array.from(
                pending
            );


        pending.clear();


        const roots =
            nodes.filter(
                node => {
                    if (
                        !node.isConnected
                    ) {
                        return false;
                    }


                    for (
                        const other
                        of nodes
                    ) {
                        if (
                            other !== node &&
                            other.isConnected &&
                            other.contains(node)
                        ) {
                            return false;
                        }
                    }


                    return true;
                }
            );


        for (
            const node
            of roots
        ) {
            processTree(node);
        }
    }

    function normalizeHover(target) {
        if (
            !(target instanceof Element)
        ) {
            return;
        }


        let el =
            target;


        let depth =
            0;


        while (
            el &&
            el !==
                document.documentElement &&
            depth < 6
        ) {
            if (
                !ignored(el) &&
                !(
                    el instanceof
                    SVGElement
                )
            ) {
                try {
                    const style =
                        getComputedStyle(el);


                    const bg =
                        parseColor(
                            style.backgroundColor
                        );


                    if (
                        bg &&
                        bg.a >= 0.05 &&
                        isNeutral(bg)
                    ) {
                        const b =
                            brightness(bg);


                        if (
                            b >= 25
                        ) {
                            setStyle(
                                el,
                                'background-color',
                                C.black
                            );
                        }
                    }
                }

                catch (_) {}
            }


            el =
                el.parentElement;


            depth++;
        }
    }


    document.addEventListener(
        'pointerover',
        event => {
            normalizeHover(
                event.target
            );
        },
        true
    );


    document.addEventListener(
        'focusin',
        event => {
            normalizeHover(
                event.target
            );
        },
        true
    );

    // Mutation Handling
    //
    // Watches added nodes AND class/style attribute changes.
    // Our own style writes are recognised via ownStyles and
    // skipped so the observer cannot loop on itself.

    function isStylesheetNode(node) {
        const tag =
            node.tagName;


        if (tag === 'STYLE') {
            return true;
        }


        if (
            tag === 'LINK' &&
            (
                node.getAttribute('rel') || ''
            ).toLowerCase().includes('stylesheet')
        ) {
            return true;
        }


        return false;
    }


    function handleMutations(mutations) {
        for (
            const mutation
            of mutations
        ) {
            if (
                mutation.type === 'childList'
            ) {
                for (
                    const node
                    of mutation.addedNodes
                ) {
                    if (
                        !(
                            node instanceof
                            Element
                        )
                    ) {
                        continue;
                    }


                    if (
                        isStylesheetNode(node)
                    ) {
                        if (
                            node.tagName === 'LINK'
                        ) {
                            node.addEventListener(
                                'load',
                                () => scheduleRescan(),
                                { once: true }
                            );
                        }

                        else {
                            scheduleRescan();
                        }


                        continue;
                    }


                    immediateBackgroundCheck(
                        node
                    );


                    queue(node);
                }


                continue;
            }


            if (
                mutation.type === 'attributes'
            ) {
                const el =
                    mutation.target;


                if (
                    !(el instanceof Element)
                ) {
                    continue;
                }


                if (
                    mutation.attributeName ===
                        'style' &&

                    el.getAttribute('style') ===
                        ownStyles.get(el)
                ) {
                    continue;
                }


                immediateBackgroundCheck(
                    el
                );


                queue(el);
            }
        }
    }


    const OBSERVER_OPTIONS = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: [
            'class',
            'style'
        ]
    };


    function startObserver() {
        const root =
            document.documentElement;


        if (!root) {
            requestAnimationFrame(
                startObserver
            );

            return;
        }


        const observer =
            new MutationObserver(
                handleMutations
            );


        observer.observe(
            root,
            OBSERVER_OPTIONS
        );
    }

    const nativeAttachShadow =
        Element.prototype.attachShadow;


    if (nativeAttachShadow) {
        Element.prototype.attachShadow =
            function(options) {

                const shadow =
                    nativeAttachShadow.call(
                        this,
                        options
                    );


                installCSS(shadow);


                if (
                    options &&
                    options.mode ===
                        'open'
                ) {
                    const shadowObserver =
                        new MutationObserver(
                            handleMutations
                        );


                    shadowObserver.observe(
                        shadow,
                        OBSERVER_OPTIONS
                    );
                }


                return shadow;
            };
    }


    // Start

    startObserver();


    if (
        document.readyState ===
        'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            initialPass,
            {
                once: true
            }
        );
    }

    else {
        initialPass();
    }


    window.addEventListener(
        'load',
        () => {
            fullRescan();


            setTimeout(fullRescan, 400);
            setTimeout(fullRescan, 1200);
            setTimeout(fullRescan, 3000);
        },
        {
            once: true
        }
    );

})();
