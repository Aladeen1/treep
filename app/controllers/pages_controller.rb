class PagesController < ApplicationController

skip_before_action :authenticate_user!

  def home
    @search_nav = true
    @footer1 = true
  end

  def search
    @search_nav = true
    @footer1 = true
  end


  def about
    @footer2 = true
  end

  def lesarbres
    @footer2 = true
  end

  def compensation
    @search_nav = true
    @footer1 = true
  end
end
