class PagesController < ApplicationController
  def home
    @search_nav = true
  end

  def search
    @search_nav = true
  end

  def compensation
    @search_nav = true
  end

  def about
    @search_nav = false
  end

  def dashboard
    @search_nav = true
  end

  def lesarbres
    @search_nav = false
  end
end
