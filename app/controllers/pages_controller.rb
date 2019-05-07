class PagesController < ApplicationController
  def home
    @search_nav = true
    @footer1 = true
  end

  def search
    @search_nav = true
    @footer1 = true
  end

  # def compensation
  #   @search_nav = true
  #   @footer1 = true
  # end

  def about
    @footer2 = true
  end

  def dashboard
    @search_nav = true
    @footer1 = true
  end

  def lesarbres
    @footer2 = true
  end
end
