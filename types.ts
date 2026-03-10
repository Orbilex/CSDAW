import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
  tags: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
  calories: number;
  image: string;
  description: string;
  badges?: string[];
  popular?: boolean;
  stock: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
}