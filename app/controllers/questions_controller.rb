class QuestionsController < ApplicationController

	skip_before_action :authenticate_user!,  :only => [:create]
	skip_after_action :verify_authorized, only: [:create]
	
	def create
		@question = Question.new(question_params)
		@question.save!

		redirect_to request.referrer
	end

	private

  	def question_params
      	params.permit(:email, :reponse)
  	end
end
