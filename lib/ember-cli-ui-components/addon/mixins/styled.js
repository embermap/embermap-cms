import Mixin from '@ember/object/mixin';
import StyleGroup from 'ember-cli-ui-components/lib/style-group';
import { assign } from '@ember/polyfills';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';

/*
  The computed classes are stored in the `activeClasses` property. By default they
  are applied to the root element.

  If you don't want them to, set

    applyActiveClassesToRoot: false

  and use them in your template

    <div class='mr4'>
      <p class={{activeClasses}}>{{yield}}</p>
    </div>
*/
export default Mixin.create({

  styles: {},
  applyActiveClassesToRoot: true,
  style: '',

  init() {
    this._super(...arguments);
    this._setStyleGroupNames();
    this._validateDefaultStyle();
    this._setTagName();

    if (this.get('tagName') !== '' && this.get('applyActiveClassesToRoot')) {
      this.classNameBindings = this.classNameBindings.slice();
      this.classNameBindings.push('activeClasses');
    }
  },

  activeStyles: computed('style', function() {
    let activeStyles = (this.get('styles.defaultStyle') || '').split(/\s/);
    let externalactiveStyles = (this.get('style') || '').split(/\s/);

    this._validateStyles(externalactiveStyles);

    externalactiveStyles.forEach(style => {
      let styleGroup = this._getStyleGroupForStyle(style);
      if (styleGroup) {
        let match = this._checkListForStyleFromGroup(activeStyles, styleGroup);
        if (match) {
          activeStyles.splice(activeStyles.indexOf(match), 1, style);
        } else {
          activeStyles.push(style);
        }
      } else {
        activeStyles.push(style);
      }
    })

    return activeStyles;
  }),

  activeClasses: computed('activeStyles', function() {
    let baseClasses = this._getBaseClasses();
    let styleClasses = this._getStyleClasses();

    return baseClasses.concat(styleClasses)
      .filter(el => !!el)
      .join(' ');
  }),

  // Private
  _getBaseClasses() {
    let baseClasses = this.get('styles.base') || '';
    return baseClasses.split(/\s/);
  },

  _getStyleClasses() {
    let styleDefinitions = this._getStyleDefinitions();

    return this.get('activeStyles')
      .map(name => styleDefinitions[name])
      .filter(definition => definition !== undefined)
      .map(definition => {
        let classes;

        if (typeof definition === 'string') {
          classes = definition;
        } else {
          classes = definition.style;
        }

        return classes;
      });
  },

  /*
    Return flat object of styles (top-level and groups)
  */
  _getStyleDefinitions() {
    let styles = this.get('styles') || {};

    return Object.keys(styles).reduce((allStyles, key) => {
      let newStyle;

      if (styles[key] instanceof StyleGroup) {
        newStyle = styles[key].styles
      } else {
        newStyle = { [key]: styles[key] };
      }

      Object.keys(newStyle).forEach(key => {
        assert(`Styled: You defined two styles named '${key}' on '${this._debugContainerKey}'. Stylenames must be unique across all groups.`, allStyles[key] === undefined);
      });

      return assign({}, allStyles, newStyle);
    }, {});
  },

  _getActiveStyleDefinitions() {
    let definitions = this._getStyleDefinitions();
    let activeStyles = this.get('activeStyles');

    return Object.keys(definitions)
      .filter(style => activeStyles.includes(style))
      .reduce((hash, style) => {
        hash[style] = definitions[style];

        return hash;
      }, {});
  },

  _setStyleGroupNames() {
    Object.keys(this.get('styles') || [])
      .forEach(key => {
        let definition = this.get(`styles.${key}`);
        if (definition instanceof StyleGroup) {
          definition.name = key;
        }
      });
  },

  _styleGroups() {
    return Object.keys(this.get('styles'))
      .map(key => this.get(`styles.${key}`))
      .filter(defn => defn instanceof StyleGroup);
  },

  _validateDefaultStyle() {
    let defaultStyle = this.get('styles.defaultStyle');

    if (defaultStyle) {

      defaultStyle.split(' ')
        .filter(Boolean)
        .forEach(style => {
          assert(
            `Styled: You set a default style named '${style}' on '${this._debugContainerKey}', but that style was not defined.`,
            this._styleExists(style)
          );
        });
    }
  },

  _styleExists(style) {
    let allStyleKeys = Object.keys(this._getStyleDefinitions());

    return allStyleKeys.includes(style);
  },

  _validateStyles(activeStyles) {
    let styleGroups = this._styleGroups();
    let styleGroupsUsed = [];

    activeStyles.filter(Boolean).forEach(style => {
      // Verify every active style has a definition
      assert(
        `Styled: You're using a style named '${style}' on '${this._debugContainerKey}', but that style was not defined.`,
        this._styleExists(style)
      );

      // Verify multiple styles from the same group are not being used
      styleGroups.forEach(styleGroup => {
        let stylesInGroup = Object.keys(styleGroup.styles);

        if (stylesInGroup.includes(style)) {
          assert(
            `Styled: You passed the '${style}' style to a ${this._debugContainerKey} but you've already used a style from the '${styleGroup.name}' oneOf group.`,
            !styleGroupsUsed.includes(styleGroup.name)
          );
          styleGroupsUsed.push(styleGroup.name);
        }
      });
    });
  },

  _getStyleGroupForStyle(style) {
    return this._styleGroups().find(styleGroup => {
      return Object.keys(styleGroup.styles).includes(style);
    });
  },

  _checkListForStyleFromGroup(list, styleGroup) {
    let stylesFromGroup = Object.keys(styleGroup.styles);

    return list.find(style => {
      return stylesFromGroup.includes(style);
    });
  },

  _setTagName() {
    let activeDefinitions = this._getActiveStyleDefinitions();
    let styleDidSetTagName;

    Object.keys(activeDefinitions)
      .forEach(style => {
        let definition = activeDefinitions[style];

        if (definition.tagName) {
          assert(`You're rendering a '${this._debugContainerKey}' with an active style of '${style}' that's setting the tagName, but the '${styleDidSetTagName}' style is already active and also setting the tagName.`, !styleDidSetTagName);
          styleDidSetTagName = style;

          this.set('tagName', definition.tagName);
        }
      });
  }
});
