# frozen_string_literal: true

class PollsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:index]

  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def create
    poll = Poll.new(poll_params)
    if poll.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Poll") }
    else
      errors = poll.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    poll = Poll.find(params[:id])
    render status: :ok, json: { poll: poll }
  rescue ActiveRecord::RecordNotFound => errors
    render json: { errors: errors }, status: :not_found
  end

  def update
    poll = Poll.find(params[:id])
    if poll.update(poll_params)
      render status: :ok, json: { notice: t("successfully_voted"), poll: poll }
    else
      render status: :unprocessable_entity, json: { errors: poll.errors.full_messages.to_sentence }
    end
  end

  private

    def poll_params
      params.require(:poll).permit(:title, :results, options: [])
    end
end
