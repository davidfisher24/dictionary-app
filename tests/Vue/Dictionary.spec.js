import { shallow, mount, createLocalVue } from 'vue-test-utils';
import expect from 'expect';
import Vuex from 'vuex'
import Dictionary from '../../resources/js/components/Dictionary.vue';
import Store from '../../resources/js/store.js';

const localVue = createLocalVue()
localVue.use(Vuex)

const setupTestWithStore = function(getters, data) {
    const store = new Vuex.Store({ getters })
    const wrapper = shallow(Dictionary, { store, localVue, data });
    return wrapper
}


describe('Dictionary', () => {

    it('renders the page correctly with title and search box', () => {
        const getters = {
          words: () => [],
        }

        const wrapper = setupTestWithStore(getters)
        expect(wrapper.html()).toContain('word dictionary');
        expect(wrapper.contains('button')).toBe(true)
        expect(wrapper.contains('input')).toBe(true)
    });

    it('renders no items and no not found box on first load', () => {
        const getters = {
          words: () => [],
        }
        const wrapper = setupTestWithStore(getters)
        expect(wrapper.contains('div.card.item')).toBe(false)
        expect(wrapper.contains('div.card.noitems')).toBe(false)
    });

    it('renders the page correctly with on item', () => {
        const getters = {
          words: () => [
              { definition: 'definition', type: 'noun' }
          ],
        }
        const wrapper = setupTestWithStore(getters)
        expect(wrapper.contains('div.card.item')).toBe(true)
    });

    it('Does not render the not found box when there are items', () => {
        const getters = {
          words: () => [
              { definition: 'definition', type: 'noun' }
          ],
        }
        const wrapper = setupTestWithStore(getters)
        expect(wrapper.contains('div.card.noitems')).toBe(false)
    });

    it('With one items renders a footer with correct text and not buttons', () => {
        const getters = {
          words: () => [
              { definition: 'definition', type: 'noun' }
          ],
        }
        const wrapper = setupTestWithStore(getters)
        expect(wrapper.contains('#previous-button')).toBe(false)
        expect(wrapper.contains('#next-button')).toBe(false)
        expect(wrapper.html()).toContain('Result 1 of 1');
    });

    it('renders one card at a time when there are mutliple items', () => {
        const getters = {
          words: () => [
              { definition: 'definition', type: 'noun' },
              { definition: 'definition 2', type: 'adjective' },
              { definition: 'definition 3', type: 'verb' }
          ],
        }
        const wrapper = setupTestWithStore(getters)
        expect(wrapper.findAll('div.card.item').length).toBe(1)
    });

    it('renders correct text and pagination on the first item in a set', () => {
        const getters = {
          words: () => [
              { definition: 'definition', type: 'noun' },
              { definition: 'definition 2', type: 'adjective' },
              { definition: 'definition 3', type: 'verb' }
          ],
        }
        const wrapper = setupTestWithStore(getters)
        expect(wrapper.contains('#previous-button')).toBe(false)
        expect(wrapper.contains('#next-button')).toBe(true)
        expect(wrapper.html()).toContain('Result 1 of 3');
    });

    it('renders correct text and pagination on a middle item in a set', () => {
        const getters = {
          words: () => [
              { definition: 'definition', type: 'noun' },
              { definition: 'definition 2', type: 'adjective' },
              { definition: 'definition 3', type: 'verb' }
          ],
        }
        const data = { currentTab: 1 }
        const wrapper = setupTestWithStore(getters, data)
        expect(wrapper.contains('#previous-button')).toBe(true)
        expect(wrapper.contains('#next-button')).toBe(true)
        expect(wrapper.html()).toContain('Result 2 of 3');
    });

    it('renders correct text and pagination on the last item in a set', () => {
        const getters = {
          words: () => [
              { definition: 'definition', type: 'noun' },
              { definition: 'definition 2', type: 'adjective' },
              { definition: 'definition 3', type: 'verb' }
          ],
        }

        const data = { currentTab: 2 }
        const wrapper = setupTestWithStore(getters, data)
        expect(wrapper.contains('#previous-button')).toBe(true)
        expect(wrapper.contains('#next-button')).toBe(false)
        expect(wrapper.html()).toContain('Result 3 of 3');
    });

    it('renders the not found display box when no items are found', () => {
        const getters = {
          words: () => [],
        }

        const data = { searched: true }
        const wrapper = setupTestWithStore(getters, data)
        expect(wrapper.contains('div.card.item')).toBe(false)
        expect(wrapper.contains('div.card.noitems')).toBe(true)
        expect(wrapper.html()).toContain('No Results');
    });

});
