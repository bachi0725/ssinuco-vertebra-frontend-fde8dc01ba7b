import { EcoTabState, EcoTabItem } from './EcoTabContext';

export type EcoTabReducerActionType =
  | { type: 'ADD_TAB'; payload: EcoTabItem }
  | { type: 'REMOVE_TAB'; payload: string }
  | { type: 'SET_ACTIVE_KEY'; payload: string };

export const EcoTabReducer = (state: EcoTabState, action: EcoTabReducerActionType): EcoTabState => {
  switch (action.type) {
    case 'ADD_TAB':
      if (state.items.find(item => item.key === action.payload.key)) {
        return { ...state, activeKey: action.payload.key };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        activeKey: action.payload.key,
      };
    case 'REMOVE_TAB':
      const newItems = state.items.filter(item => item.key !== action.payload);
      let newActiveKey = state.activeKey;

      if (newActiveKey === action.payload) {
        const index = state.items.findIndex(item => item.key === action.payload);
        if (index > 0) {
          newActiveKey = newItems[index - 1]?.key || 'COMPANIA';
        } else if (newItems.length > 0) {
          newActiveKey = newItems[0].key;
        } else {
          newActiveKey = 'COMPANIA';
        }
      }

      return {
        ...state,
        items: newItems,
        activeKey: newActiveKey,
      };
    case 'SET_ACTIVE_KEY':
      return {
        ...state,
        activeKey: action.payload,
      };
    default:
      return state;
  }
};