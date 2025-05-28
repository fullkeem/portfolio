import { create } from "zustand";

interface FilterStore {
  // Portfolio filters
  selectedTechnologies: string[];
  portfolioSearchQuery: string;
  setSelectedTechnologies: (technologies: string[]) => void;
  setPortfolioSearchQuery: (query: string) => void;
  clearPortfolioFilters: () => void;

  // Blog filters
  selectedCategory: string | null;
  selectedTags: string[];
  blogSearchQuery: string;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTags: (tags: string[]) => void;
  setBlogSearchQuery: (query: string) => void;
  clearBlogFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  // Portfolio state
  selectedTechnologies: [],
  portfolioSearchQuery: "",
  
  // Portfolio actions
  setSelectedTechnologies: (technologies) => set({ selectedTechnologies: technologies }),
  setPortfolioSearchQuery: (query) => set({ portfolioSearchQuery: query }),
  clearPortfolioFilters: () => set({ selectedTechnologies: [], portfolioSearchQuery: "" }),

  // Blog state
  selectedCategory: null,
  selectedTags: [],
  blogSearchQuery: "",
  
  // Blog actions
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setBlogSearchQuery: (query) => set({ blogSearchQuery: query }),
  clearBlogFilters: () => set({ selectedCategory: null, selectedTags: [], blogSearchQuery: "" }),
}));
