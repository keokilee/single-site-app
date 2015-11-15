import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import expect from 'expect';
import Header from 'app/components/Header';

describe('Header', () => {
  describe('buttons', () => {
    it('has four buttons', () => {
      const component = renderIntoDocument(
        <Header enableBack={() => true} enableForward={() => true} />
      );

      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      expect(buttons.length).toEqual(4);
    });

    describe('back', () => {
      it('is not disabled if enableBack returns true', () => {
        const component = renderIntoDocument(
          <Header enableBack={() => true} enableForward={() => true} />
        );

        const backButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(backButton.disabled).toBe(false);
      });

      it('is disabled if enableBack returns false', () => {
        const component = renderIntoDocument(
          <Header enableBack={() => false} enableForward={() => true} />
        );

        const backButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(backButton.disabled).toBe(true);
      });
    });

    describe('forward', () => {
      it('is not disabled if enableForward returns true', () => {
        const component = renderIntoDocument(
          <Header enableBack={() => true} enableForward={() => true} />
        );

        const forwardButton = scryRenderedDOMComponentsWithTag(component, 'button')[1];
        expect(forwardButton.disabled).toBe(false);
      });

      it('is disabled if enableForward returns false', () => {
        const component = renderIntoDocument(
          <Header enableBack={() => false} enableForward={() => false} />
        );

        const forwardButton = scryRenderedDOMComponentsWithTag(component, 'button')[1];
        expect(forwardButton.disabled).toBe(true);
      });
    });
  });
});
