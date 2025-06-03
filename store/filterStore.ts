import { create } from "zustand";

interface FilterStore {
  // Portfolio filters
  selectedTechnologies: string[];
  portfolioSearchQuery: string;
  setSelectedTechnologies: (technologies: string[]) => void;
  setPortfolioSearchQuery: (query: string) => void;
  toggleTechnology: (technology: string) => void;
  clearPortfolioFilters: () => void;

  // Blog filters
  selectedCategory: string | null;
  selectedTags: string[];
  blogSearchQuery: string;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTags: (tags: string[]) => void;
  setBlogSearchQuery: (query: string) => void;
  toggleBlogTag: (tag: string) => void;
  clearBlogFilters: () => void;

  // Aliases for easier access (포트폴리오용)
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  // Portfolio state
  selectedTechnologies: [],
  portfolioSearchQuery: "",
  searchQuery: "", // portfolioSearchQuery와 동일한 값을 가질 예정

  // Portfolio actions
  setSelectedTechnologies: (technologies) => set({ selectedTechnologies: technologies }),
  setPortfolioSearchQuery: (query) => set({ portfolioSearchQuery: query, searchQuery: query }),
  toggleTechnology: (technology) => {
    const { selectedTechnologies } = get();
    const newTechnologies = selectedTechnologies.includes(technology)
      ? selectedTechnologies.filter((tech) => tech !== technology)
      : [...selectedTechnologies, technology];
    set({ selectedTechnologies: newTechnologies });
  },
  clearPortfolioFilters: () => set({ selectedTechnologies: [], portfolioSearchQuery: "", searchQuery: "" }),

  // Blog state
  selectedCategory: null,
  selectedTags: [],
  blogSearchQuery: "",

  // Blog actions
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setBlogSearchQuery: (query) => set({ blogSearchQuery: query }),
  toggleBlogTag: (tag) => {
    const { selectedTags } = get();
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    set({ selectedTags: newTags });
  },
  clearBlogFilters: () => set({ selectedCategory: null, selectedTags: [], blogSearchQuery: "" }),

  // Aliases - 포트폴리오용 별칭들
  setSearchQuery: (query) => set({ portfolioSearchQuery: query, searchQuery: query }),
  clearFilters: () => set({ selectedTechnologies: [], portfolioSearchQuery: "", searchQuery: "" }),
}));
