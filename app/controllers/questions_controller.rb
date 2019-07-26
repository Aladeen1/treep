class QuestionsController < ApplicationController
	def create
		@question = Question.new(question_params)
		@question.save!

		redirect_to root_path
	end

	private

  	def question_params
      	params.permit(:email, :reponse)
  	end
end
