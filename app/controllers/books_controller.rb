class BooksController < ApplicationController
  def index
    response = HTTParty.get("https://api.nytimes.com/svc/books/v3/lists.json?api-key=#{ENV['NYTIMES_KEY']}&list=mass-market-paperback")


    @books = []

    response.parsed_response["results"].each do |result|

      @isbn = result["book_details"][0]["primary_isbn10"]


      goog_response = HTTParty.get("https://www.googleapis.com/books/v1/volumes?q=#{@isbn}&key=#{ENV['GBOOKS_KEY']}")

      bookimg = goog_response.parsed_response["items"][0]["volumeInfo"]["imageLinks"]["smallThumbnail"]


      @books << { title: result["book_details"][0]["title"], author: result["book_details"][0]["author"], description: result["book_details"][0]["description"], isbn: result["book_details"][0]["primary_isbn10"], bookimage: bookimg }
    end
  end

  def show
  end

  def edit
  end

  def update
  end
end
