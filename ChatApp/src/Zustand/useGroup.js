import { create } from 'zustand';

export const useGroup = create((set) => ({
    selectedGroup: null,
    setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
    groupMessages: [],
    setGroupMessages: (groupMessages) => set({ groupMessages }),
}));

export default useGroup;