import { create } from 'zustand';

interface FilterState {
  // Portfolio filters
  selectedTechnologies: string[];
  selectedProjectType: string | null;
  searchQuery: string;
  
  // Blog filters
  selectedCategory: string | null;
  selectedTags: string[];
  blogSearchQuery: string;
  
  // Portfolio actions
  setSelectedTechnologies: (technologies: string[]) => void;
  toggleTechnology: (technology: string) => void;
  setSelectedProjectType: (type: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetPortfolioFilters: () => void;
  
  // Blog actions
  setSelectedCategory: (category: string | null) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  setBlogSearchQuery: (query: string) => void;
  resetBlogFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  // Portfolio initial state
  selectedTechnologies: [],
  selectedProjectType: null,
  searchQuery: '',
  
  // Blog initial state
  selectedCategory: null,
  selectedTags: [],
  blogSearchQuery: '',
  
  // Portfolio actions
  setSelectedTechnologies: (technologies) => set({ selectedTechnologies: technologies }),
  
  toggleTechnology: (technology) => set((state) => ({
    selectedTechnologies: state.selectedTechnologies.includes(technology)
      ? state.selectedTechnologies.filter((t) => t !== technology)
      : [...state.selectedTechnologies, technology]
  })),
  
  setSelectedProjectType: (type) => set({ selectedProjectType: type }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  resetPortfolioFilters: () => set({
    selectedTechnologies: [],
    selectedProjectType: null,
    searchQuery: ''
  }),
  
  // Blog actions
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  
  toggleTag: (tag) => set((state) => ({
    selectedTags: state.selectedTags.includes(tag)
      ? state.selectedTags.filter((t) => t !== tag)
      : [...state.selectedTags, tag]
  })),
  
  setBlogSearchQuery: (query) => set({ blogSearchQuery: query }),
  
  resetBlogFilters: () => set({
    selectedCategory: null,
    selectedTags: [],
    blogSearchQuery: ''
  })
}));
